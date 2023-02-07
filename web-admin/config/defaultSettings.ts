import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'EBoard M',
  pwa: false,
  logo: 'http://img.yuadh.com/imgs/2023/02/04/app_logo.png',
  iconfontUrl: '',
};

export default Settings;
