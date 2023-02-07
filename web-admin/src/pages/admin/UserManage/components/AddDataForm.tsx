
import React,{useState} from 'react';
import { Button, Form, Input, Modal, Radio,notification,message } from 'antd';
import { addUser } from '@/services/ant-design-pro/api';

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
        title="添加用户"
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
          initialValues={{ userRole: 'user',userStatus:'0' }}
        >
          <Form.Item
            name="userAccount"
            label="账号"
            rules={[
                { required: true, message: '账户不能为空!' },
                { pattern: /^[a-zA-Z0-9_-]{4,16}$/,message:'账户只能由4-16个字母数字或下划线组成!'},
                { min:4,message:'账号长度不能小于4'}]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
           name="userPassword" 
           label="密码"
           rules={[{required:true,message:'密码不能为空!'},{min:6,message:'密码长度不能小于6'}]}>
            <Input  type="password" />
          </Form.Item>
          <Form.Item label="权限"  name="userRole" className="collection-create-form_last-form-item">
            <Radio.Group>
              <Radio value="user">普通用户</Radio>
              <Radio value="admin">管理员</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="状态"  name="userStatus"  className="collection-create-form_last-form-item">
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
    const [open, setOpen] = useState(false);
    const {refrensh} = props
    const onCreate = async (values: any) => {
      console.log('Received values of form: ', values);
      try{
        const res = await addUser(values as API.AddUserParams);
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
          添加用户
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