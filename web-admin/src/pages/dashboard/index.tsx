import type { FC} from 'react';
import {useEffect,useState } from 'react';
import { Avatar, Card, Col, message, Row } from 'antd';
import { Link,useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import EditableLinkGroup from './components/EditableLinkGroup';
import styles from './style.less';
import { getUserInitVO } from '@/services/ant-design-pro/api'
import { useModel } from 'umi';
import ConferenceCount from './components/ConferenceCount'
import SystemResource from './components/SystemResource'

const links = [
  {
    title: '会议历史记录',
    href: '/history',
  },
  {
    title: '系统实验室',
    href: '/lab-system',
  },
  {
    title: '账号设置',
    href: '/user-setting',
  },
  {
    title: '模块管理',
    href: '/admin/system-monitor',
  },
];



const DashboardWorkplace: FC =  () => {
  const [initVO,setInitVO] = useState();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  // const { loading: projectLoading, data: projectNotice = [] } = useRequest(queryProjectNotice);
  // const { loading: activitiesLoading, data: activities = [] } = useRequest(queryActivities);
  // const { data } = useRequest(fakeChartData);
  async function getUserInit(){
    try{
      const res = await getUserInitVO({id:currentUser?.id})
      setInitVO(res)
    }catch(e){
    }
  }
  useEffect(() => {
    getUserInit();
  }, []);

  const projectNotice = [
    {id:1,href:'https://github.com/liyupi',logo:'https://avatars.githubusercontent.com/u/26037703',member:'程序员鱼皮'},
    {id:2,href:'https://pro.ant.design',logo:'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',member:'Ant Design Pro'},
    {id:3,href:'https://www.bt.cn/',logo:'https://www.bt.cn/Public/new/images/logo.svg',member:'宝塔'},
    {id:4,href:'https://github.com/yuadh',logo:'https://avatars.githubusercontent.com/u/50506923',member:'yuadh'},

  ]

  return (<PageContainer
   loading = {initVO==undefined}>
    <SystemResource initVO={initVO}/>
    <Row 
     gutter={24}
     >
      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
        <ConferenceCount initVO={initVO}/>
      </Col>
    </Row>
    <Row 
      gutter={24} 
      style={{
        marginTop: 24,
      }}>
      <Col xl={12} lg={24} md={24} sm={24} xs={24}>
        <Card
          style={{ marginBottom: 24 }}
          title="快速开始 / 便捷导航"
          bordered={false}
          bodyStyle={{ padding: 0 }}
        >
          <EditableLinkGroup onAdd={() => {}} links={links} linkElement={Link} />
        </Card>
      </Col>
      <Col xl={12} lg={24} md={24} sm={24} xs={24}>
      <Card
          bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
          bordered={false}
          title="友情链接"
          // loading={projectLoading}
        >
          <div className={styles.members}>
            <Row gutter={48}>
              {projectNotice.map((item) => (
                <Col span={12} key={`members-item-${item.id}`}>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    <Avatar src={item.logo} size="small" />
                    <span className={styles.member}>{item.member}</span>
                  </a>
                </Col>
              ))}
            </Row>
          </div>
        </Card>
      </Col>
    </Row>
  </PageContainer>)
  
};

export default DashboardWorkplace;
