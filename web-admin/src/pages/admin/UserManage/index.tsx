import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { searchUsers,deleteUser } from "@/services/ant-design-pro/api";
import {Image,Tag,Button,Popconfirm,message,notification} from "antd";
import AddDataForm from './components/AddDataForm';
import UpdateDataForm from './components/UpdateDataForm';
import moment from 'moment';


export default () => {
  const actionRef = useRef<ActionType>();
  const refrenshFrom = ()=>{
    console.log('刷新咯')
    actionRef.current.reload();
  }
  const deleteHandle = async(value: API.DeleteParams)=>{
    const req = await deleteUser(value);
    console.log(req)
    if(req){
      refrenshFrom()
      notification.open({
        message:'操作成功'
      })
    }
  }
  const columns: ProColumns<API.CurrentUser>[] = [
    {
      key:'id',
      title: 'ID',
      dataIndex:'id',
      width: 48,
      sorter: (a: any, b: any) => a.id - b.id,
    },
    {
      title: '用户账户',
      dataIndex: 'userAccount',
      copyable: true,
    },
    {
      title: '用户昵称',
      dataIndex: 'userName',
      copyable: true,
    },
    {
      title: '头像',
      search: false,
      dataIndex: 'userAvater',
      render: (_, record) => (
        <div>
          <Image src={record.userAvater} width={40} />
        </div>
      ),
    },
    {
      title: '电话',
      dataIndex: 'phone',
      copyable: true,
    },
    {
      title: '邮件',
      search: false,
      dataIndex: 'email',
      copyable: true,
    },
    {
      title:'权限',
      dataIndex:'userRole',
      key:'userRole',
      search: false,
      filters:[
        {
          text:'普通用户',
          value: 'user',
        },
        {
          text:'管理员',
          value: 'admin',
        }
      ],
      onFilter:(value: any,record: any) => record.userRole === value,
      render:(value: any)=>(<div>{value==='user'?<Tag color='green'>普通用户</Tag>:<Tag color='red'>管理员</Tag>}</div>)
    },
    {
      title: '状态',
      dataIndex: 'userStatus',
      valueType: 'select',
      key:'userStatus',
      onFilter: (value: any,record: any) => record.userStatus === value,
      filters:[
        {
          text:'正常',
          value: 0,
        },
        {
          text:'封禁',
          value: 1,
        }
      ],
      valueEnum: {
        0: { text: '正常', status: 'Processing' },
        1: {
          text: '封禁',
          status: 'Error',
        },
      },
    },
  
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: (a: any, b: any) => moment(a.createTime).diff(b.createTime),
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <UpdateDataForm key="editable" refrensh={refrenshFrom} uid={record.id}/>,
        <Popconfirm
          title="你确定要删除吗？"
          onConfirm={() => deleteHandle({id:record.id} as API.DeleteParams)}
          style={{ marginRight: 16 }}
          okText="确定"
          cancelText="取消"
        >
            <a>删除</a>
        </Popconfirm>
      ],
    },
  ];
  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(params,sort, filter);
        const userList = await searchUsers(params);
        return {
          data: userList
        }
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 10,
      }}
      dateFormatter="string"
      headerTitle="用户管理"
      toolBarRender={() => [
        <AddDataForm refrensh={refrenshFrom}/>,]
      }
    />
  );
};
