import { Card, Typography } from 'antd';
import styles from './index.less';
import ConferenceEchartVO from '../ConferenceEchartVO'
// const { Text } = Typography;

const ProportionSales = (props: any) => {
  const {mouthData} = props.initVO
  return (
    <Card
      className={styles.salesCard}
      bordered={false}
      title="UserVO"
      style={{
        height: '100%',
      }}
    >
      <div>
        <ConferenceEchartVO mouthData={mouthData} />
      </div>
    </Card>
  );
};

export default ProportionSales;
