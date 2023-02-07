import {Button,Input} from "antd";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from "react-highlight-words";

let searchInput: any,searchText: any,searchedColumn: any;


//搜索处理
const handleSearch = async(selectedKeys: any, confirm: any, dataIndex: any) => {
  confirm();
  searchText = selectedKeys[0]
  searchedColumn = dataIndex
};
//重置处理
const handleReset = (clearFilters: any) => {
  clearFilters();
  searchText = ''
};
const getColumSearchProps = (dataIndex: any)=>({
  //自定义赛选
  filterDropdown:({setSelectedKeys, selectedKeys, confirm, clearFilters }: any)=>(
   <div style={{ padding: 8 }}>
      <Input
        ref={node => {
          console.log(setSelectedKeys)
          searchInput = node
        }}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
      />
      <Button
        type="primary"
        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
        size="small"
        style={{ width: 90, marginRight: 8 }}
      >
        搜索
      </Button>
      <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
        重置
      </Button>
    </div> 
  ),
  //赛选按钮
  filterIcon: (filtered: any) => (
    <SearchOutlined />
  ),
  //赛选过滤
  onFilter: (value: any, record: any) =>{
    console.log(record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),"xxx===")
    return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
  },
  //输入控件显示
  onFilterDropdownVisibleChange: (visible: any) => {
    if (visible) {
      setTimeout(() => searchInput.select());
    }
  },
  //渲染函数
  render: (text: any) =>{
    return searchedColumn === dataIndex ? (
      <div>
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text}
        />
      </div>
    ) : text
  }
})

export default  getColumSearchProps