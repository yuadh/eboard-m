-- 创建库
create database if not exists eboard_m;

-- 切换库
use eboard_m;

-- 创建用户表
create table if not exists user
(
    id           bigint auto_increment  primary key not null comment 'id',
    userAccount  varchar(256)                 		not null comment '账号',
    userPassword varchar(512)                       not null comment '密码',
    userName     varchar(256)                       null comment '昵称',
    userAvater   varchar(1024)                      null comment '头像',
    gender		 tinyint							null comment '性别',
    phone		 varchar(128)    					null comment '电话',
    email		 varchar(512)    			        null comment '邮箱',
    openId		 varchar(1024)					    null comment 'openId',
    userRole     varchar(256)  default 'user'       not null comment ' user-普通用户 admin-超级管理员',
    userStatus	 tinyint  default 0  				not null comment ' 0-正常 1-封禁',
    createTime   datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime   datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint  default 0                 not null comment '是否删除 0-正常 1-删除',
    constraint uni_userAccount
        unique (userAccount)
)	CHARSET=utf8
    comment '用户表';

-- 创建设备表
create table if not exists equipment
(
    id           		 bigint auto_increment  primary key not null comment 'id',
    equipmentCode    varchar(256)                       not null comment '设备编码',
    equipmentMsg  	 varchar(512) default ''            not null comment '设备信息',
    equipmentScreen  varchar(1024)                      null comment '设备屏幕图片',
    equipmentIp		 	 varchar(512)   				null comment '设备ip',
    roomId 		 			 bigint  default 0          not null comment '会议室id 0-未加入',
    equipmentStatus	 tinyint default 0  				not null comment ' 0-正常 1-封禁',
    createTime   datetime default CURRENT_TIMESTAMP 	not null comment '创建时间',
    updateTime   datetime default CURRENT_TIMESTAMP 	not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint  default 0                 	not null comment '是否删除 0-正常 1-删除',
    constraint uni_equipmentCode
        unique (equipmentCode)
)	CHARSET=utf8
    comment '设备表';

-- 创建会议室表
create table if not exists room
(
    id             bigint auto_increment  primary key not null comment 'id',
    roomName 	     varchar(512)                       not null comment '会议室名称',
    roomPassword   varchar(512)                  	    not null comment '会议室密码',
    roomMsg  	     varchar(1024) default ''           not null comment '会议室信息',
    equipmentCount int(40) default 10                 not null comment '设备容量',
    adminId			 	 bigint	 default 0									not null comment '创建会议室的管理员id',
    roomStatus	 	 tinyint default 0  							  not null comment ' 0-正常 1-封禁',
    createTime   	 datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime     datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete       tinyint  default 0                 not null comment '是否删除 0-正常 1-删除'
)	CHARSET=utf8
    comment '会议室表';

-- 创建会议室用户绑定表
create table if not exists room_into
(
    id           bigint auto_increment  primary key not null comment 'id',
    userId			 bigint															not null comment '用户id',
    roomId 			 bigint															not null comment '会议室id',
    createTime   datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime   datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint  default 0                 not null comment '是否删除'
)	CHARSET=utf8
    comment '用户绑定表';

-- 创建历史记录表
create table if not exists history
(
    id             bigint auto_increment  primary key not null comment 'id',
    conferenceName varchar(512)                       not null comment '进行的会议名称',
    roomId   			 bigint             		 						not null comment '会议室id',
    userId 			 	 bigint   default 0              	  not null comment '会议室操作员id',
    isFinish 		 	 tinyint  default 0                 not null comment '完成标志符,0-未完成 1-完成',
    createTime     datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    finishTime     datetime  													null  comment '完成时间',
    isDelete     	 tinyint  default 0                 not null comment '是否删除'
)	CHARSET=utf8
    comment '会议记录表';

-- 创建会议记录内容表
create table if not exists history_details
(
    id             bigint auto_increment  primary key not null comment 'id',
    historyId   		bigint             		 						 not null comment '会议记录id',
    conferenceName varchar(512)                       not null comment '进行的会议名称',
    content	 			text															 not null comment '会议内容',
    userId 			 	bigint   default 0              	 not null comment '会议室操作员id',
    createTime     datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    finishTime     datetime  												 null  comment '完成时间',
    isDelete     	tinyint  default 0                 not null comment '是否删除'
)
-- 用户表内容填充
insert into `user` (`id`, `userAccount`, `userPassword`, `userName`,`userRole`) values (1, 'root', 'bba9a65c9c04f7455777529702fa62db', 'root','admin');
insert into `user` (`id`, `userAccount`, `userPassword`, `userName`) values (2, 'yuadh2', 'bba9a65c9c04f7455777529702fa62db', 'yuadh1');
insert into `user` (`id`, `userAccount`, `userPassword`, `userName`) values (3, 'yuadh3', 'bba9a65c9c04f7455777529702fa62db', 'yuadh2');
insert into `user` (`id`, `userAccount`, `userPassword`, `userName`) values (4, 'yuadh4', 'bba9a65c9c04f7455777529702fa62db', 'yuadh3');
insert into `user` (`id`, `userAccount`, `userPassword`, `userName`) values (5, 'yuadh5', 'bba9a65c9c04f7455777529702fa62db', 'yuadh4');
insert into `user` (`id`, `userAccount`, `userPassword`, `userName`) values (6, 'yuadh6', 'bba9a65c9c04f7455777529702fa62db', 'yuadh5');
insert into `user` (`id`, `userAccount`, `userPassword`, `userName`) values (7, 'yuadh7', 'bba9a65c9c04f7455777529702fa62db', 'yuadh6');
insert into `user` (`id`, `userAccount`, `userPassword`, `userName`) values (8, 'yuadh8', 'bba9a65c9c04f7455777529702fa62db', 'yuadh7');
insert into `user` (`id`, `userAccount`, `userPassword`, `userName`) values (9, 'yuadh9', 'bba9a65c9c04f7455777529702fa62db', 'yuadh8');
insert into `user` (`id`, `userAccount`, `userPassword`, `userName`) values (10, 'yuadh10', 'bba9a65c9c04f7455777529702fa62db', 'yuadh9');

-- 设备表填充
insert into `equipment` (`id`, `equipmentCode`) values (1, 'yuadh');
insert into `equipment` (`id`, `equipmentCode`) values (2, 'yuadh1');
insert into `equipment` (`id`, `equipmentCode`) values (3, 'yuadh2');
insert into `equipment` (`id`, `equipmentCode`) values (4, 'yuadh3');
insert into `equipment` (`id`, `equipmentCode`) values (5, 'yuadh4');
insert into `equipment` (`id`, `equipmentCode`) values (6, 'yuadh5');
insert into `equipment` (`id`, `equipmentCode`) values (7, 'yuadh6');
insert into `equipment` (`id`, `equipmentCode`) values (8, 'yuadh7');
insert into `equipment` (`id`, `equipmentCode`) values (9, 'yuadh8');
insert into `equipment` (`id`, `equipmentCode`) values (10, 'yuadh9');

-- 会议室表填充
insert into `room` (`id`, `roomName`, `roomPassword`) values (1, 'yuadh', 'bba9a65c9c04f7455777529702fa62db');
insert into `room` (`id`, `roomName`, `roomPassword`) values (2, 'yuadh1', 'bba9a65c9c04f7455777529702fa62db');
insert into `room` (`id`, `roomName`, `roomPassword`) values (3, 'yuadh2', 'bba9a65c9c04f7455777529702fa62db');
insert into `room` (`id`, `roomName`, `roomPassword`) values (4, 'yuadh3', 'bba9a65c9c04f7455777529702fa62db');
insert into `room` (`id`, `roomName`, `roomPassword`) values (5, 'yuadh4', 'bba9a65c9c04f7455777529702fa62db');
insert into `room` (`id`, `roomName`, `roomPassword`) values (6, 'yuadh5', 'bba9a65c9c04f7455777529702fa62db');
insert into `room` (`id`, `roomName`, `roomPassword`) values (7, 'yuadh6', 'bba9a65c9c04f7455777529702fa62db');
insert into `room` (`id`, `roomName`, `roomPassword`) values (8, 'yuadh7', 'bba9a65c9c04f7455777529702fa62db');
insert into `room` (`id`, `roomName`, `roomPassword`) values (9, 'yuadh8', 'bba9a65c9c04f7455777529702fa62db');
insert into `room` (`id`, `roomName`, `roomPassword`) values (10, 'yuadh9', 'bba9a65c9c04f7455777529702fa62db');
