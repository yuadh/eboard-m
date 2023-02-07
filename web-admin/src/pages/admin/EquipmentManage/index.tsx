import React, { useRef,useState,useEffect } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { listEquipment,deleteEquipment ,listRoom} from "@/services/ant-design-pro/system";
import {Image,Tag,Button,Popconfirm,message,notification} from "antd";
import AddDataForm from './components/AddDataForm';
import UpdateDataForm from './components/UpdateDataForm';
import moment from 'moment';
import SearchFormData from '@/components/FormDataSearch'

export default () => {

  const [edata,setEdata] = useState()

  async function getUserInit(){
    try{
      const res = await listRoom({})
      setEdata(res)
    }catch(e){
    }
  }
  useEffect(() => {
    getUserInit();
  },[]);

  const actionRef = useRef<ActionType>();
  const refrenshFrom = ()=>{
    console.log('刷新咯')
    actionRef.current.reload();
  }
  const deleteHandle = async(value: API.DeleteParams)=>{
    const req = await deleteEquipment(value);
    console.log(req)
    if(req){
      refrenshFrom()
      notification.open({
        message:'操作成功'
      })
    }
  }
  const columns: ProColumns<API.EquipmentVO>[] = [
    {
      key:'id',
      title: 'ID',
      dataIndex:'id',
      width: 48,
      sorter: (a: any, b: any) => a.id - b.id,
    },
    {
      title: '设备编码',
      dataIndex: 'equipmentCode',
      ...SearchFormData('equipmentCode')
    },
    {
      title: '设备信息',
      dataIndex: 'equipmentMsg',
      copyable: true,
      search: false,
    },
    {
      title: '设备ip',
      dataIndex: 'equipmentIp',
      copyable: true,
      search: false,
    },
    {
      title: '屏幕信息',
      search: false,
      dataIndex: 'equipmentScreen',
      render: (_, record) => (
        <div>
          <Image src={record.equipmentScreen} width={40} />
        </div>
      ),
    },
    {
      title:'所在会议室',
      dataIndex:'roomName',
      key:'roomName',
      search: false,
      filters:[
        {
          text:'已分配',
          value: true,
        },
        {
          text:'未分配',
          value: false,
        }
      ],
      onFilter:(value: any,record: any) => (record.roomName!==null) === value,
      render:(value: any)=>(<div>{value!=='-'?<Tag color='green'>{value}</Tag>:<Tag color='red'>暂未分配</Tag>}</div>)
    },
    {
      title: '状态',
      dataIndex: 'equipmentStatus',
      valueType: 'select',
      key:'equipmentStatus',
      onFilter: (value: any,record: any) => record.equipmentStatus === value,
      filters:[
        {
          text:'空闲',
          value: 0,
        },
        {
          text:'正常',
          value: 1,
        }
      ],
      valueEnum: {
        0: { text: '空闲', status: 'success' },
        1: {
          text: '繁忙',
          status: 'Error',
        },
      },
    },
  
    {
      title: '添加时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: (a: any, b: any) => moment(a.createTime).diff(b.createTime),
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <UpdateDataForm key="editable" refrensh={refrenshFrom} eid={record.id} rdata={edata}/>,
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
    <ProTable<API.EquipmentVO>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(params,sort, filter);
        const userList = await listEquipment(params);
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
      headerTitle="设备管理"
      toolBarRender={() => [
        <AddDataForm edata={edata} refrensh={refrenshFrom}/>,]
      }
    />
  );
};
