import type {FC } from 'react';
import React, { useState, useRef, useLayoutEffect } from 'react';
import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Menu,Alert,Avatar,Skeleton ,Statistic} from 'antd';
import BaseView from './components/base';
import BindingView from './components/binding';
import NotificationView from './components/notification';
import SecurityView from './components/security';
import styles from './style.less';
import { useModel } from 'umi';

const { Item } = Menu;

type AccountSettingsStateKeys = 'base' | 'security' | 'binding' | 'notification';
type AccountSettingsState = {
  mode: 'inline' | 'horizontal';
  selectKey: AccountSettingsStateKeys;
};


const PageHeaderContent: FC<{ currentUser: API.CurrentUser }> = ({ currentUser }) => {
  const loading = currentUser && Object.keys(currentUser).length;
  if (!loading) {
    return <Skeleton avatar paragraph={{ rows: 1 }} active />;
  }
  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.userAvater} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          欢迎，
          {currentUser.userName}
          ，祝你开心每一天！
        </div>
        <div>
          {currentUser.userRole} | {"EBoard电子桌牌系统"}
        </div>
      </div>
    </div>
  );
};

const ExtraContent: FC<Record<string, any>> = () => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
      <Statistic title="会议室" value={40} />
    </div>
    <div className={styles.statItem}>
      <Statistic title="参会次数" value={2233} />
    </div>
  </div>
);

const AccountSettings: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {}; 

  const menuMap: Record<string, React.ReactNode> = {
    base: '基本设置',
    security: '安全设置',
    binding: '账号绑定',
    notification: '新消息通知',
  };

  const [initConfig, setInitConfig] = useState<AccountSettingsState>({
    mode: 'inline',
    selectKey: 'base',
  });
  const dom = useRef<HTMLDivElement>();

  const resize = () => {
    requestAnimationFrame(() => {
      if (!dom.current) {
        return;
      }
      let mode: 'inline' | 'horizontal' = 'inline';
      const { offsetWidth } = dom.current;
      if (dom.current.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      setInitConfig({ ...initConfig, mode: mode as AccountSettingsState['mode'] });
    });
  };

  useLayoutEffect(() => {
    if (dom.current) {
      window.addEventListener('resize', resize);
      resize();
    }
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [dom.current]);

  const getMenu = () => {
    return Object.keys(menuMap).map((item) => <Item key={item}>{menuMap[item]}</Item>);
  };

  const renderChildren = () => {
    const { selectKey } = initConfig;
    switch (selectKey) {
      case 'base':
        return <BaseView />;
      case 'security':
        return <SecurityView />;
      case 'binding':
        return <BindingView />;
      case 'notification':
        return <NotificationView />;
      default:
        return null;
    }
  };

  return (
    <PageContainer
       content={
        <PageHeaderContent
          currentUser={{
            group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
            ...currentUser
          }}
        />
      }
      extraContent={<ExtraContent/>}
    >
       <GridContent>
      <div
        className={styles.main}
        ref={(ref) => {
          if (ref) {
            dom.current = ref;
          }
        }}
      >
        <div className={styles.leftMenu}>
        <Alert
          message={'开发中仅部分功能可用'}
          type="success"
          showIcon
          banner
        />
          <Menu
            mode={initConfig.mode}
            selectedKeys={[initConfig.selectKey]}
            onClick={({ key }) => {
              setInitConfig({
                ...initConfig,
                selectKey: key as AccountSettingsStateKeys,
              });
            }}
          >
            {getMenu()}
          </Menu>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>{menuMap[initConfig.selectKey]}</div>
          {renderChildren()}
        </div>
      </div>
    </GridContent>
    </PageContainer>
  );
};
export default AccountSettings;
