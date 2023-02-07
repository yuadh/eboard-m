import React from 'react';
import { useModel } from 'umi';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Upload, message,notification } from 'antd';
import ProForm, {
  ProFormDependency,
  ProFormFieldSet,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormDateRangePicker
} from '@ant-design/pro-form';
import { useRequest } from 'umi';
import { currentUser as queryCurrent,updateUser } from '@/services/ant-design-pro/api'

import styles from './BaseView.less';


// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }: { avatar: string }) => (
  <>
    <div className={styles.avatar_title}>头像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          更换头像
        </Button>
      </div>
    </Upload>
  </>
);

const BaseView: React.FC = () => {
  
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  const getAvatarURL = () => {
    console.log(currentUser)
    if (currentUser) {
      if (currentUser.userAvater) {
        return currentUser.userAvater;
      }
      const url = 'http://img.yuadh.com/imgs/2023/02/03/logo2.png';
      return url;
    }
    return '';
  };

  const handleFinish = async (values: any) => {
    const req: API.UpdateUserResponse = {
      ...currentUser,
      ...values
    } 
    try{
      const res = await updateUser(req);
      if(res){
        notification.open({
          message:'操作成功'
        })
      }
    }catch(e){
      notification.open({
        message: '操作失败',
      });
    }
  };
  return (
    <div className={styles.baseView}>
      { (
        <>
          <div className={styles.left}>
            <ProForm
              layout="vertical"
              onFinish={handleFinish}
              submitter={{
                resetButtonProps: {
                  style: {
                    display: 'none',
                  },
                },
                submitButtonProps: {
                  children: '更新基本信息',
                },
              }}
              request={
                queryCurrent
              }
              hideRequiredMark
            >
              <ProFormText
                width="md"
                name="userAccount"
                label="账号"
                disabled
              />
              <ProFormText
                width="md"
                name="userRole"
                label="权限"
                disabled
              />
              <ProFormText
                width="md"
                name="userName"
                label="昵称"
                rules={[
                  {
                    required: true,
                    message: '请输入您的昵称!',
                  },
                ]}
              />
                <ProFormText
                width="md"
                name="phone"
                label="电话"
                rules={[
                  {
                    required: true,
                    message: '请输入您的电话!',
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="email"
                label="邮箱"
                rules={[
                  {
                    required: true,
                    message: '请输入您的邮箱!',
                  },
                ]}
              />
              <ProFormText.Password
                width="md"
                name="userPassword"
                label="密码"
                placeholder="请重置您的密码!"
                rules={[
                  {
                    required: true,
                    message: '请重置您的密码!',
                  },
                ]}
              />
              <ProFormSelect
                width="xs"
                options={[
                  {
                    value: null,
                    label: '未知',
                  },{
                    value: 1,
                    label: '男',
                  },{
                    value: 2,
                    label: '女',
                  }
                ]}
                name="gender"
                label="性别"
              />
            </ProForm>
          </div>
          <div className={styles.right}>
            <AvatarView avatar={getAvatarURL()} />
          </div>
        </>
      )}
    </div>
  );
};

export default BaseView;
