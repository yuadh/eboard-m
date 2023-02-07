import React from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';

const Admin: React.FC = (props) => {
  const {children} = props;
  return (
    <PageHeaderWrapper>
      {children}
    </PageHeaderWrapper>
  );
};

export default Admin;
