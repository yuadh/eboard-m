
import React,{useState,useEffect} from 'react';
import { Button, Form, Input, Modal, Radio,notification,message,Select } from 'antd';
import { addEquipment } from '@/services/ant-design-pro/system';
interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  edata: any;
}
interface FatherFuncs{
    refrensh: () => void
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    open,
    onCreate,
    onCancel,
    edata=null
  }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        open={open}
        title="添加设备"
        okText="添加"
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
          initialValues={{ roomId: 0,equipmentStatus:'0' }}
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
              edata===null?(<>无会议室，请先 <a>添加</a> 会议室</>):(
                <Select placeholder="Please select a country" >
                  <Select.Option key={0} value={0}>
                    不分配
                  </Select.Option>
                  {
                    edata.map((item: any)=>{
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
              <Radio value="0">正常</Radio>
              <Radio value="1">封禁</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

const AddDataForm: React.FC<FatherFuncs> = (props: any)=>{
    const [open, setOpen] = useState(false);
    const {refrensh,edata} = props
    console.log(props)
    const onCreate = async (values: any) => {
      console.log('Received values of form: ', values);
      try{
        const res = await addEquipment(values as API.EquipmentAddRequest);
        if(res){
            notification.open({
                message: '操作成功',
            });
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
        <Button
          type="primary"
          onClick={() => {
            setOpen(true);
          }}
        >
          添加设备
        </Button>
        <CollectionCreateForm
          open={open}
          onCreate={onCreate}
          onCancel={() => {
            setOpen(false);
          }}
          edata={edata}
        >{edata}</CollectionCreateForm>
      </div>
    );
}


export default AddDataForm