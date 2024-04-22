README.md

更新（2024）：已经很久没看毕设源码了回答不了什么问题了，资料已全开源。（😁不过可以出售毕业论文全套参考，省去你查找文献写论文时间， 保证低查重率）

> 快速体验地址    管理端：  [https://admin.yuadh.com](https://admin.yuadh.com) 、用户端微信小程序搜：  **EBM桌牌**<br/>
> 项目制作有些地方比较粗糙，可能有不规范的地方，正在不断学习完善中.. 欢迎提出修改建议。

<img src="http://img.yuadh.com/imgs/2023/02/07/1675735958233.png" alt="Hi, I'm yuadh"
           width="300" height="120"
           style="background-color: white!important;padding: 5px;"   >

<br/>



**项目特点:**

- ⌛  小型项目涉及前后端以及硬件端
- ✔️ 完整的项目流程资料，从立项到发布上线
- 📃 墨水屏显示屏，Floyd-Steinberg算法生成黑白图像数据
- 🎯 基于模板开发，可以在此项目上修改成你的应用
- 🔥  uniapp适配了安卓app、以及微信小程序
- 🍪 更多特点开发中

## 项目介绍

​	`eboard` 起初是个人的墨水屏天气预报桌面摆件，后来在摸索中变成了电子桌牌项目。`eboard-m` 是一个智能电子桌牌系统，该系统主要作用于日常会议中，拥有会议信息显示、参会人员信息显示、会议流程控制和后台管理等功能。系统由服务端、管理端、用户端和设备端这四部分构成。系统小而全且基于模板开发，软硬件都涉及适用于物联网类同学基于此项目开发你的课设、毕设等小型项目。

​	`eboard` 是个人在项目流程学习的输出作品，在项目立项、需求分析、技术选型、系统设计、功能排期、开发实现、测试上线等环节都有详细资料，为有需要的同学提供思路和参考资料。如果你觉得此项目帮助到了你，欢迎留下 `⭐start`，非常感谢。

图片参考资料：

|                                                              |                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| <img src="http://img.yuadh.com/imgs/2023/02/07/1675736291629.png" alt="管理端效果图"           width="400" height="300"           style="background-color: white!important;padding: 5px;"> | <img src="http://img.yuadh.com/imgs/2023/02/07/1675736418081.jpg"           width="400" height="300"           style="background-color: white!important;padding: 5px;"> |
| <img src="http://img.yuadh.com/imgs/2023/02/07/1675736479569.png" alt="墨水屏天气时钟，参考"           width="400" height="300"           style="background-color: white!important;padding: 5px;"> | <img src="http://img.yuadh.com/imgs/2023/02/07/1675736735322.jpg" alt="设备端效果图"           width="400" height="300"           style="background-color: white!important;padding: 5px;"> |

### 主要技术栈：

#### 前端

- Vue、uniapp   用户端适配了安卓app和微信小程序
- React、Ant Design Pro   管理端
- TypeScript、Eslint    代码规范工具
- openapi   配合后端生成 ts 数据结构

#### 后端

- SpringBoot   全家桶一套
- MQTT协议   使用 [EMQX开源版本](https://www.emqx.io/zh)
- MySQL   存储方式
- Knife4j   接口文档生成

### 项目文件结构

​	 服务端、管理端和应用端包含**用户模块**、**设备模块**、**会议室模块**、**会议记录模块**四个主要内容。每个项目文件简单清晰，稍微打开看看就能知道每个文件的内容和作用，这里就不做详细介绍。

- docs - 项目资料包括：sql建表文件、流程图等项目资料
- hardware - 设备端源码
- server - 服务端源码
- uniapp - 应用端源码
- web-admin - 管理端源码
- .cz-config.js - 提交规范配置，遵循Angular规范

## 快速启动

​	项目启动需要配置一些环境，比如JDK、Node、MySQL等，以及项目使用到的uniapp框架需要用到官方的HBuilder编辑器。大部分都是常用环境，仅有MQTT环境较为少用且搭建步骤在下文设备端有说明。

开始前将代码clone或下载到本地。

### 01.服务端启动

​	1）IDEA打开项目（server文件夹），使用docs里的建表sql语句创建数据库

​	2）打开 `application.yml` 文件，修改为自己的本地数据库

​	3）运行项目，浏览器打开 `http://localhost:7529/api/doc.html#/home` 

​	4）看到有 `Knife4j` 生成的文档说明安装成功

（此时未接入MQTT服务器，有 `无法连接至服务器 (32103)` 报错先不管）

​	![服务端安装成功图片](http://img.yuadh.com/imgs/2023/02/07/1675736912042.png)

### 02.管理端启动

​	1） 打开项目（web-admin文件夹），安装依赖，`yarn` 

​	2） 运行项目，`yarn start`

看到登录界面，且开了刚刚启动的后台服务后能登录成功说明安装成功

![管理端安装成功图片](http://img.yuadh.com/imgs/2023/02/07/1675737384326.png)

### 03.应用端启动

​	1）使用uniapp官方编辑器 HBuilder X 打开项目（uniapp文件夹）

​	2）点击 `运行` 到微信小程序、或~~安卓手机app~~（需要线上地址或配置好调试环境）

点击我的跳转到登录界面，且开了刚刚启动的后台服务后能登录成功说明安装成功

![](http://img.yuadh.com/imgs/2023/02/07/1675737352976.png)

### 04.设备端启动

​	1）首先安装MQTT服务器，用于设备端和服务端的通信，打开链接根据需要下载https://www.emqx.io/zh，然后根据提示命令启动MQTT服务器。推荐在 Linux 系统下操作，能通过 **18083** 端口访问到页面说明成功： ![MQTT服务器安装成功图片](http://img.yuadh.com/imgs/2023/02/07/1675737684159.png)

​	2）设备硬件使用的是微雪 [esp32墨水屏驱动板](https://www.waveshare.net/wiki/E-Paper_ESP32_Driver_Board)+[4.2寸墨水屏](https://www.waveshare.net/wiki/4.2inch_e-Paper_Module_Manual#.E8.AF.B4.E6.98.8E) ，根据官方提供的 [环境搭建](https://www.waveshare.net/wiki/E-Paper_ESP32_Driver_Board#.E4.BD.BF.E7.94.A8.E5.87.86.E5.A4.87) 配置好硬件环境。烧录成功后，可以通过WiFi示例显示后说明设备环境配置成功。然后再将 `文件夹hardware` 里的文件用 Arduino 打开烧录进设备。此时设备端就算安装成功。![设备端安装成功图片](http://img.yuadh.com/imgs/2023/02/07/1675737613673.png)

 至此，系统的所有部分安装完成。**重启下所有的服务后，**你可以给设备联网，调试你的设备和系统。

## 效果展示

### 管理端

|          |                                                             |                                                             |                                                             |                                                             |
| -------- | ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| 模块管理 | ![](http://img.yuadh.com/imgs/2023/02/07/1675737856062.png) | ![](http://img.yuadh.com/imgs/2023/02/07/1675737893652.png) | ![](http://img.yuadh.com/imgs/2023/02/07/1675737927834.png) | ![](http://img.yuadh.com/imgs/2023/02/07/1675737967619.png) |
| 其它功能 | ![](http://img.yuadh.com/imgs/2023/02/07/1675738010200.png) | ![](http://img.yuadh.com/imgs/2023/02/07/1675738042608.png) | ![](http://img.yuadh.com/imgs/2023/02/07/1675738098458.png) | ![](http://img.yuadh.com/imgs/2023/02/07/1675738133829.png) |

### 客户端

|          |                                                             |                                                             |                                                             |                                                             |
| -------- | ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| 会议流程 | ![](http://img.yuadh.com/imgs/2023/02/07/1675738866871.jpg) | ![](http://img.yuadh.com/imgs/2023/02/07/1675738894055.jpg) | ![](http://img.yuadh.com/imgs/2023/02/07/1675738930487.jpg) | ![](http://img.yuadh.com/imgs/2023/02/07/1675738947903.jpg) |
| 其它功能 | ![](http://img.yuadh.com/imgs/2023/02/07/1675736418081.jpg) | ![](http://img.yuadh.com/imgs/2023/02/07/1675738979191.jpg) | ![](http://img.yuadh.com/imgs/2023/02/07/1675739006535.jpg) | ![](http://img.yuadh.com/imgs/2023/02/07/1675739023399.jpg) |

### 设备端

|                                                              |                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| <img src="http://img.yuadh.com/imgs/2023/02/07/1675736735322.jpg" alt="设备端效果图"           width="400" height="300"           style="background-color: white!important;padding: 5px;"> | <img src="http://img.yuadh.com/imgs/2023/02/07/1675737684159.png" alt="设备端效果图"           width="400" height="300"           style="background-color: white!important;padding: 5px;"> |
| <img src="http://img.yuadh.com/imgs/2023/02/07/1675739184154.png" alt="设备端效果图"           width="400" height="300"           style="background-color: white!important;padding: 5px;"> | <img src="http://img.yuadh.com/imgs/2023/02/07/1675739310689.png" alt="设备端效果图"           width="400" height="300"           style="background-color: white!important;padding: 5px;"> |

### 服务端

![服务端安装成功图片](http://img.yuadh.com/imgs/2023/02/07/1675736912042.png)

## 项目文档

项目文档在 （docs文件夹中）推荐使用语雀导入，pdf版本有点内容缺失。

后续会整理发布到在线文档中。。

## todo

- [ ] 添加会议内容模块内容
- [ ] 添加管理端鉴权功能
- [ ] 用户端添加模板定制功能
- [ ] 优化一些代码结构等等

## 致谢

感谢 [微雪电子官网](https://www.waveshare.net/wiki/E-Paper_ESP32_Driver_Board) 提供的众多示例代码



**最后**

**项目使用 MIT 协议，你可以随意的使用此项目。**

**如果你觉得项目对你有所帮助，可以简单的赞助下小弟！**

|                                                              |
| ------------------------------------------------------------ |
| <img src="http://img.yuadh.com/imgs/2023/02/07/1675740863557.png" alt="设备端效果图"           width="400" height="400" style="background-color: white!important;padding: 5px;"> |

