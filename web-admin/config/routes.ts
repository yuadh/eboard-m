export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: '登录',
            path: '/user/login',
            component: './user/Login',
          },
          {
            name: '注册',
            path: '/user/register',
            component: './user/Register',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/dashboard',
    name: '系统面板',
    icon: 'icon-fa-home',
    component: './dashboard',
  },
  {
    path: '/admin',
    name: '管理模块',
    icon: 'icon-tikuguanli',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/user-manage',
        name: '用户管理',
        component: './admin/UserManage',
      },
      {
        name: '设备管理',
        path: '/admin/equipment-manage',
        component: './admin/EquipmentManage',
      },
      {
        name: '会议室管理',
        path: '/admin/room-manage',
        component: './admin/RoomManage',
      },
      {
        name: '系统监控',
        icon: 'smile',
        path: '/admin/system-monitor',
        component: './admin/SystemMonitor',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/lab',
    name: '系统实验室',
    icon: 'icon-faxian',
    // component: './labSystem',
    routes: [
      {
        name: '会议模板测试',
        path: '/lab/eboard-show',
        component: './labSystem/EboardShow',
      },
      {
        name: '会议记录编辑器',
        path: '/lab/editorflow',
        component: './labSystem/EditorFlow',
      },
      {
        component: './404',
      },
    ]
  },
  {
    name: '会议历史记录',
    icon: 'icon-lishijilu',
    path: '/history',
    component: './history',
  },
  {
    name: '账号信息',
    icon: 'icon-zhanghu',
    path: '/user-setting',
    component: './userSettings',
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    component: './404',
  },
];
