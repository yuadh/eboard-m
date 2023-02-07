
import { Col, Row,Card } from 'antd';

import {BankOutlined,TabletOutlined,UserOutlined,HistoryOutlined   } from '@ant-design/icons';
import styles from './index.less';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 12 },
};
// { loading, visitData = [] }: { loading: boolean; visitData: DataItem[] }
const IntroduceRow = (props: any) => {
  const {roomCount,equipmentCount,userCount,historyCount} = props.initVO
  return  (
    <Row gutter={24}>
      <Col {...topColResponsiveProps} >
        <Card bordered={false}>
          <div className={styles.eb_main}>
            <div className={styles.eb_rooms}>
                <BankOutlined />
            </div>
            <div className={styles.eb_right}>
                <div className={styles.eb_title }>总会议室</div>
                <h2  >{roomCount}</h2>
            </div>
          </div>
        </Card>
      </Col>
  
      <Col {...topColResponsiveProps} >
        <Card bordered={false}>
          <div className={styles.eb_main}>
            <div className={styles.eb_equipments}>
              <TabletOutlined  />
            </div>
            <div className={styles.eb_right}>
              <div className={styles.eb_title }>设备数量</div>
              <h2>{equipmentCount}</h2>
            </div>
          </div>
        </Card>
      </Col>
  
      <Col {...topColResponsiveProps} >
        <Card bordered={false}>
          <div className={styles.eb_main}>
            <div className={styles.eb_users}>
                <UserOutlined />
            </div>
            <div className={styles.eb_right}>
                <div className={styles.eb_title }>用户数量</div>
                <h2>{userCount}</h2>
            </div>
          </div>
        </Card>
      </Col>
  
      <Col {...topColResponsiveProps} >
      <Card bordered={false}>
        <div className={styles.eb_main}>
          <div className={styles.eb_historyCounts}>
              <HistoryOutlined/>
          </div>
          <div  className={styles.eb_right}>
              <div className={styles.eb_title }>会议历史</div>
              <h2>{historyCount}</h2>
          </div>
        </div>
      </Card>
      </Col>
    </Row>
  );
}

export default IntroduceRow;
