import React, { useRef,useState } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { searchUsers,deleteUser } from "@/services/ant-design-pro/api";
import { searchHistorys } from '@/services/ant-design-pro/system';
import Icon,{Image,Tag,Button,Popconfirm,message,notification,Input} from "antd";
import moment from 'moment';
import SearchFormData from '@/components/FormDataSearch'
import {  PageContainer } from '@ant-design/pro-layout';

export default () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<API.CurrentUser>[] = [
    {
      key:'id',
      title: 'ID',
      dataIndex:'id',
      width: 48,
      sorter: (a: any, b: any) => a.id - b.id,
    },
    {
      title: '会议名称',
      dataIndex: 'conferenceName',
      // copyable: true,
      ...SearchFormData('conferenceName')
    },
    {
      title: '操作员',
      dataIndex: 'userName',
      copyable: true,
      search: false,
    },
    {
      title: '所在会议室',
      dataIndex: 'roomName',
      copyable: true,
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'isFinish',
      valueType: 'select',
      key:'isFinish',
      onFilter: (value: any,record: any) => record.isFinish === value,
      filters:[
        {
          text:'未完成',
          value: 0,
        },
        {
          text:'已完成',
          value: 1,
        }
      ],
      valueEnum: {
        0: { text: '未完成', status: 'Processing' },
        1: {
          text: '已完成',
          status: 'Success',
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
      title: '完成时间',
      dataIndex: 'finishTime',
      valueType: 'dateTime',
      sorter: (a: any, b: any) => moment(a.createTime).diff(b.createTime),
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <Popconfirm
          title="系统正在开发中.."
          onConfirm={() => {}}
          style={{ marginRight: 16 }}
          okText="确定"
          cancelText="取消"
        >
            <a>查看会议内容</a>
        </Popconfirm>
      ],
    },
  ];
  return (
    <PageContainer>

<ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(params,sort, filter);
        const userList = await searchHistorys(params);
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
    />
    </PageContainer>
  );
};
