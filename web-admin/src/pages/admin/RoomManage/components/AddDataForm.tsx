
import React,{useState} from 'react';
import { Button, Form, Input, Modal, Radio,notification,InputNumber } from 'antd';
import { addRoom } from '@/services/ant-design-pro/system';
import { useModel } from 'umi';
const { TextArea } = Input;
interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}
interface FatherFuncs{
    refrensh: () => void
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    open,
    onCreate,
    onCancel,
  }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        open={open}
        title="添加会议室"
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
          initialValues={{ roomStatus:'0',equipmentCount:10 }}
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
              <Radio value="0">正常</Radio>
              <Radio value="1">封禁</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

const AddDataForm: React.FC<FatherFuncs> = (props)=>{
    const { initialState } = useModel('@@initialState');
    const { currentUser } = initialState || {};
    const [open, setOpen] = useState(false);
    const {refrensh} = props
    const onCreate = async (values: any) => {
      console.log('Received values of form: ', values);
      const req = {
        adminId:currentUser.id,
        ...values
      }
      console.log(req)
      try{
        const res = await addRoom(req as API.RoomAddRequest);
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
          添加会议室
        </Button>
        <CollectionCreateForm
          open={open}
          onCreate={onCreate}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </div>
    );
}


export default AddDataForm