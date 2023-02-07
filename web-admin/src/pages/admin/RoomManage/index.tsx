import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { listRoom,deleteRoom } from "@/services/ant-design-pro/system";
import {Image,Tag,Button,Popconfirm,message,notification} from "antd";
import AddDataForm from './components/AddDataForm';
import UpdateDataForm from './components/UpdateDataForm';
import SearchFormData from '@/components/FormDataSearch'
import moment from 'moment';


export default () => {
  const actionRef = useRef<ActionType>();
  const refrenshFrom = ()=>{
    console.log('刷新咯')
    actionRef.current.reload();
  }
  const deleteHandle = async(value: API.DeleteParams)=>{
    const req = await deleteRoom(value);
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
      title: '会议室名',
      dataIndex: 'roomName',
      ...SearchFormData('roomName')
    },
    {
      title: '会议室信息',
      dataIndex: 'roomMsg',
      copyable: true,
      ellipsis: true,
      search: false,
    },
    {
      title: '会议室设备容量',
      dataIndex: 'equipmentCount',
    },
    {
      title: '会议室管理员',
      search: false,
      dataIndex: 'adminName',
    },
    {
      title: '状态',
      dataIndex: 'roomStatus',
      valueType: 'select',
      key:'roomStatus',
      onFilter: (value: any,record: any) => record.roomStatus === value,
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
        <UpdateDataForm key="editable" refrensh={refrenshFrom} rid={record.id}/>,
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
    <ProTable<API.RoomVO>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(params,sort, filter);
        const dataList = await listRoom(params);
        return {
          data: dataList
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
