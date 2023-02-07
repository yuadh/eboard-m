
import React,{useState} from 'react';
import { Button, Form, Input, Modal, Radio,notification,InputNumber } from 'antd';
import { updateRoom,getRoomById } from '@/services/ant-design-pro/system';
import { useModel } from 'umi';
const { TextArea } = Input;

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  open: boolean;
  rdata: API.RoomVO;
  edata: API.CurrentUser;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}
interface FatherFuncs{
    refrensh: () => void
    rid: number | undefined,
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    open,
    rdata,
    onCreate,
    onCancel,
  }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        open={open}
        title="更新会议室"
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
          initialValues={{ ...rdata }}
        >
          <Form.Item
            name="roomName"
            label="会议室名"
            rules={[
                { required: true, message: '会议室名不能为空!' },
                { min:4,message:'会议室名长度不能小于4'}]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
           name="roomPassword" 
           label="密码"
           rules={[{required:true,message:'密码不能为空!'},{min:6,message:'密码长度不能小于6'}]}>
            <Input  type="password" />
          </Form.Item>
          <Form.Item
            name="roomMsg"
            label="会议室信息"
          >
            <TextArea rows={4}  />
          </Form.Item>
          <Form.Item
            name="equipmentCount"
            label="会议室容量"
          >
            <InputNumber min={1} max={40} defaultValue={10} style={{width:'100%'}}/>
          </Form.Item>
          <Form.Item label="状态"  name="roomStatus"  className="collection-create-form_last-form-item">
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
    const { initialState } = useModel('@@initialState');
    const { currentUser } = initialState || {};
    const {refrensh,rid} = props
    const openInit = async ()=>{
      try{
        const res = await getRoomById({id:rid});
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
        adminId: currentUser.id,
        id:rid,
        ...values
      } 
      try{
        const res = await updateRoom(req);
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
          rdata = {edata}
        />
      </div>
    );
}


export default UpdateDataForm