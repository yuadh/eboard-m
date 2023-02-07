import {GithubOutlined,FormOutlined,MessageOutlined} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-layout';

const Footer: React.FC = () => {
  const defaultMessage = 'EBoard | yuadh';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'use',
          title: <><FormOutlined />使用手册</>,
          href: 'https://pro.ant.design/zh-CN/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined/> 开源地址</>,
          href: 'https://github.com/yuadh/eboard-m',
          blankTarget: true,
        },
        {
          key: 'more',
          title: <><MessageOutlined /> 更多信息</>,
          href: 'https://space.bilibili.com/27125162',
          blankTarget: true,
        },

      ]}
    />
  );
};

export default Footer;
