declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseEquipmentVO_ = {
    code?: number;
    data?: EquipmentVO;
    message?: string;
  };

  type BaseResponseInitVO_ = {
    code?: number;
    data?: InitVO;
    message?: string;
  };

  type BaseResponseListConferenceVO_ = {
    code?: number;
    data?: ConferenceVO[];
    message?: string;
  };

  type BaseResponseListEquipmentVO_ = {
    code?: number;
    data?: EquipmentVO[];
    message?: string;
  };

  type BaseResponseListInRoomEquipmentVO_ = {
    code?: number;
    data?: InRoomEquipmentVO[];
    message?: string;
  };

  type BaseResponseListRoomIntoVO_ = {
    code?: number;
    data?: RoomIntoVO[];
    message?: string;
  };

  type BaseResponseListRoomVO_ = {
    code?: number;
    data?: RoomVO[];
    message?: string;
  };

  type BaseResponseListUserVO_ = {
    code?: number;
    data?: UserVO[];
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseNowRoomDataVO_ = {
    code?: number;
    data?: NowRoomDataVO;
    message?: string;
  };

  type BaseResponsePageConferenceVO_ = {
    code?: number;
    data?: PageConferenceVO_;
    message?: string;
  };

  type BaseResponsePageEquipmentVO_ = {
    code?: number;
    data?: PageEquipmentVO_;
    message?: string;
  };

  type BaseResponsePageRoomIntoVO_ = {
    code?: number;
    data?: PageRoomIntoVO_;
    message?: string;
  };

  type BaseResponsePageRoomVO_ = {
    code?: number;
    data?: PageRoomVO_;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    message?: string;
  };

  type BaseResponseRoomVO_ = {
    code?: number;
    data?: RoomVO;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type ConferenceStartRequest = {
    conferenceName?: string;
    createTime?: string;
    finishTime?: string;
    id?: number;
    isFinish?: number;
    roomId?: number;
    userId?: number;
  };

  type ConferenceVO = {
    conferenceName?: string;
    createTime?: string;
    finishTime?: string;
    id?: number;
    isFinish?: number;
    roomId?: number;
    roomName?: string;
    userId?: number;
  };

  type DeleteRequest = {
    id?: number;
  };

  type EquipmentAddRequest = {
    equipmentCode?: string;
    equipmentMsg?: string;
    equipmentStatus?: number;
    roomId?: number;
  };

  type EquipmentUpdateRequest = {
    equipmentCode?: string;
    equipmentMsg?: string;
    equipmentStatus?: number;
    id?: number;
    roomId?: number;
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

  type finishConferenceUsingPOSTParams = {
    /** id */
    id: number;
  };

  type getEquipmentByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getEquipmentByRoomIdUsingGETParams = {
    /** roomId */
    roomId?: number;
  };

  type getListByAdminIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getListByConditionsUsingGETParams = {
    adminId?: number;
    hasRoom?: boolean;
  };

  type getListByRoomIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getNowByRoomIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getRoomByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getRoomsByAdminIdUsingGETParams = {
    /** adminId */
    adminId?: number;
  };

  type getRoomsByUserIdUsingGETParams = {
    /** userId */
    userId?: number;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type HistoryCountVO = {
    count?: number;
    date?: string;
  };

  type InitVO = {
    equipmentCount?: number;
    historyCount?: number;
    mouthData?: HistoryCountVO[];
    roomCount?: number;
    todayData?: HistoryCountVO;
    userCount?: number;
  };

  type InRoomEquipmentVO = {
    createTime?: string;
    equipmentCode?: string;
    equipmentIp?: string;
    equipmentMsg?: string;
    equipmentScreen?: string;
    equipmentStatus?: number;
    id?: number;
    roomName?: string;
    updateTime?: string;
  };

  type IntoAddRequest = {
    roomName?: string;
    roomPassword?: string;
    userId?: number;
  };

  type IntoQuiteRequest = {
    roomId?: number;
    userId?: number;
  };

  type listEquipmentByPageUsingGET1Params = {
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

  type listEquipmentByPageUsingGETParams = {
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

  type listEquipmentUsingGET1Params = {
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

  type listEquipmentUsingGETParams = {
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

  type listHistoryByPageUsingGETParams = {
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

  type listRoomIntoByPageUsingGETParams = {
    createTime?: string;
    current?: number;
    id?: number;
    pageSize?: number;
    roomId?: number;
    sortField?: string;
    sortOrder?: string;
    updateTime?: string;
    userId?: number;
  };

  type listRoomIntoUsingGETParams = {
    createTime?: string;
    current?: number;
    id?: number;
    pageSize?: number;
    roomId?: number;
    sortField?: string;
    sortOrder?: string;
    updateTime?: string;
    userId?: number;
  };

  type listUserByPageUsingGETParams = {
    createTime?: string;
    current?: number;
    email?: string;
    gender?: number;
    id?: number;
    openId?: string;
    pageSize?: number;
    phone?: string;
    sortField?: string;
    sortOrder?: string;
    updateTime?: string;
    userAccount?: string;
    userAvater?: string;
    userName?: string;
    userRole?: string;
    userStatus?: number;
  };

  type listUserUsingGETParams = {
    createTime?: string;
    current?: number;
    email?: string;
    gender?: number;
    id?: number;
    openId?: string;
    pageSize?: number;
    phone?: string;
    sortField?: string;
    sortOrder?: string;
    updateTime?: string;
    userAccount?: string;
    userAvater?: string;
    userName?: string;
    userRole?: string;
    userStatus?: number;
  };

  type NowRoomDataVO = {
    equipmentCount?: number;
    flag?: number;
    id?: number;
    inRoomEquipmenCount?: number;
    roomName?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageConferenceVO_ = {
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

  type PageEquipmentVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: EquipmentVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageRoomIntoVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: RoomIntoVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageRoomVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: RoomVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type RoomAddRequest = {
    adminId?: number;
    equipmentCount?: number;
    roomMsg?: string;
    roomName?: string;
    roomPassword?: string;
    roomStatus?: number;
  };

  type RoomIntoVO = {
    createTime?: string;
    id?: number;
    roomId?: number;
    updateTime?: string;
    userId?: number;
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

  type User = {
    createTime?: string;
    email?: string;
    gender?: number;
    id?: number;
    isDelete?: number;
    openId?: string;
    phone?: string;
    updateTime?: string;
    userAccount?: string;
    userAvater?: string;
    userName?: string;
    userPassword?: string;
    userRole?: string;
    userStatus?: number;
  };

  type UserAddRequest = {
    userAccount?: string;
    userPassword?: string;
    userRole?: string;
    userStatus?: number;
  };

  type userInitUsingGETParams = {
    /** id */
    id: number;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
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

  type UserVO = {
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
}
