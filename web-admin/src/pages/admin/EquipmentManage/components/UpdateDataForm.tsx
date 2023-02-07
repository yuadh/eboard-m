
import React,{useState} from 'react';
import { Button, Form, Input, Modal, Radio,notification,message,Select } from 'antd';
import { updateEquipment,getEquipmentById } from '@/services/ant-design-pro/system';


interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  open: boolean;
  rdata: API.RoomVO[];
  edata: API.CurrentUser;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}
interface FatherFuncs{
    refrensh: () => void
    uid: number | undefined,
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    open,
    edata,
    onCreate,
    onCancel,
    rdata
  }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        open={open}
        title="更新设备"
        okText="更新"
        cancelText="取消"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
              notification.open({
                message:'添加失败'
              })
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{...edata }}
        >
          <Form.Item
            name="equipmentCode"
            label="设备编码"
            rules={[
                { required: true, message: '设备编码不能为空!' },
                { min:4,message:'设备编码有误'}]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
           name="equipmentMsg" 
           label="设备信息"
           rules={[]}>
            <Input />
          </Form.Item>
          <Form.Item 
            label="会议室"
            name="roomId"
            >{
              rdata===null?(<>无会议室，请先 <a>添加</a> 会议室</>):(
                <Select placeholder="Please select a country" >
                  <Select.Option key={0} value={0}>
                    不分配
                  </Select.Option>
                  {
                    rdata.map((item: any)=>{
                      return (
                        <Select.Option key={item.id} value={item.id}>
                            {item.roomName}
                        </Select.Option>
                      )
                    })
                  }
                </Select>
              )   
            }
          </Form.Item>
          <Form.Item label="状态"  name="equipmentStatus"  className="collection-create-form_last-form-item">
            <Radio.Group>
              <Radio value={0}>正常</Radio>
              <Radio value={1}>封禁</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

const UpdateDataForm: React.FC<FatherFuncs> = (props: any)=>{
    const [open, setOpen] = useState(false);
    const [edata,setEdata] = useState({} as API.EquipmentUpdateRequest);
    const {refrensh,eid,rdata} = props
    const openInit = async ()=>{
      try{
        const res = await getEquipmentById({id:eid});
        if(res){
          setEdata(res)
        }
        setOpen(true);
      }catch(e){
        notification.open({
          message:'修改失败'
        })
        setOpen(false);
      }
    }

    const onCreate = async (values: any) => {
      console.log('Received values of form: ', values);
      const req: API.UpdateUserResponse = {
        id:eid,
        ...values
      } 
      try{
        const res = await updateEquipment(req);
        if(res){
          notification.open({
            message:'操作成功'
          })
        }  
        setOpen(false);
        refrensh();
      }catch(e){
        notification.open({
          message: '操作失败',
        });
        setOpen(false);
        refrensh();
      }
    };

    return (
      <div>
        <a
          type="primary"
          onClick={openInit}
        >
          编辑
        </a>
        <CollectionCreateForm
          edata={edata}
          open={open}
          onCreate={onCreate}
          onCancel={() => {
            setOpen(false);
          }}
          rdata = {rdata}
        />
      </div>
    );
}


export default UpdateDataForm