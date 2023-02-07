// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    createTime?: string;
    email?: string;
    gender?: number;
    id?: number;
    openId?: string;
    phone?: string;
    updateTime?: string;
    userAccount?: string;
    userAvater?: string;
    userName?: string;
    userRole?: string;
    userStatus?: number;
  };




  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type UserAddResponse = number;

  type UpdateUserResponse = number;

  type DeleteResponse = boolean;

  type RegisterResult = number;

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  /**
   * 通用返回类
   */
  type BaseResponse<T> = {
    code: number,
    data: T,
    message: string,
    description: string,
  }

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    userAccount?: string;
    userPassword?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type RegisterParams = {
    userAccount?: string;
    userPassword?: string;
    checkPassword?: string;
    type?: string;
  };

  type DeleteParams = {
    id?: number;
    type?: string;
  };

  type AddUserParams = {
    userAccount?: string;
    userPassword?: string;
    userRole?: string;
    userStatus?: number;
  };

  type UserUpdateRequest = {
    email?: string;
    gender?: number;
    id?: number;
    phone?: string;
    userAccount?: string;
    userAvater?: string;
    userName?: string;
    userPassword?: string;
    userRole?: string;
    userStatus?: number;
  };

  type getUserByIdParams = {
    id?: number | undefined;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };

  // system
  type listHistoryParams = {
    conferenceName?: string;
    createTime?: string;
    current?: number;
    finishTime?: string;
    id?: number;
    isFinish?: number;
    pageSize?: number;
    roomId?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };
  type historyData = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: ConferenceVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };
  type userInitParams = {
    /** id */
    id: number;
  };
  type InitVO = {
    equipmentCount?: number;
    historyCount?: number;
    mouthData?: HistoryCountVO[];
    roomCount?: number;
    todayData?: HistoryCountVO;
    userCount?: number;
  };

  type listEquipmentParams = {
    createTime?: string;
    current?: number;
    equipmentCode?: string;
    equipmentIp?: string;
    equipmentMsg?: string;
    equipmentStatus?: number;
    id?: number;
    pageSize?: number;
    roomId?: number;
    sortField?: string;
    sortOrder?: string;
    updateTime?: string;
  };
  type EquipmentVO = {
    createTime?: string;
    equipmentCode?: string;
    equipmentIp?: string;
    equipmentMsg?: string;
    equipmentScreen?: string;
    equipmentStatus?: number;
    id?: number;
    roomId?: number;
    updateTime?: string;
  };
  type EquipmentUpdateRequest = {
    equipmentCode?: string;
    equipmentMsg?: string;
    equipmentStatus?: number;
    id?: number;
    roomId?: number;
  };
  type equipmentParams = {
    /** id */
    id: number;
  };
  type roomParams = {
    /** id */
    id: number;
  };
  type EquipmentAddRequest = {
    equipmentCode?: string;
    equipmentMsg?: string;
    equipmentStatus?: number;
    roomId?: number;
  };
  type DeleteRequest = {
    id?: number;
  };

  type listRoomParams = {
    adminId?: number;
    createTime?: string;
    current?: number;
    equipmentCount?: number;
    id?: number;
    pageSize?: number;
    roomMsg?: string;
    roomName?: string;
    roomStatus?: number;
    sortField?: string;
    sortOrder?: string;
    updateTime?: string;
  };
  type RoomVO = {
    adminId?: number;
    createTime?: string;
    equipmentCount?: number;
    id?: number;
    roomMsg?: string;
    roomName?: string;
    roomStatus?: number;
    updateTime?: string;
  };
  type RoomAddRequest = {
    adminId?: number;
    equipmentCount?: number;
    roomMsg?: string;
    roomName?: string;
    roomPassword?: string;
    roomStatus?: number;
  };
  type RoomUpdateRequest = {
    adminId?: number;
    equipmentCount?: number;
    id?: number;
    roomMsg?: string;
    roomName?: string;
    roomPassword?: string;
    roomStatus?: number;
  };
}
