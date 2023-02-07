
import React,{useState} from 'react';
import {  Form, Input, Modal, Radio,notification,message } from 'antd';
import { updateUser,getUserById } from '@/services/ant-design-pro/api';


interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  open: boolean;
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
  }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        open={open}
        title="更新用户"
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
          initialValues={{ 
            userRole: edata.userRole,
            userStatus:edata.userStatus,
            userAccount:edata.userAccount}}
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
            <Input  placeholder="请重置密码"  type="password" />
          </Form.Item>
          <Form.Item label="权限"  name="userRole" className="collection-create-form_last-form-item">
            <Radio.Group>
              <Radio value="user">普通用户</Radio>
              <Radio value="admin">管理员</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="状态"  name="userStatus"  className="collection-create-form_last-form-item">
            <Radio.Group>
              <Radio value={0}>正常</Radio>
              <Radio value={1}>封禁</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

const UpdateDataForm: React.FC<FatherFuncs> = (props)=>{
    const [open, setOpen] = useState(false);
    const [edata,setEdata] = useState({} as API.CurrentUser);
    const {refrensh,uid} = props
    const openInit = async ()=>{
      try{
        const res = await getUserById({id:uid});
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
        ...edata,
        ...values
      } 
      try{
        const res = await updateUser(req);
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
        />
      </div>
    );
}


export default UpdateDataForm