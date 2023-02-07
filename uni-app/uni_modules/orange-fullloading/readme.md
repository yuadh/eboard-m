
### 安装方式

本组件符合[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)规范，`HBuilderX 2.5.5`起，只需将本组件导入项目，在页面`template`中即可直接使用，无需在页面中`import`和注册`components`。

### 基本用法

在 ``template`` 中使用组件

```html
<orange-fullloading :loadicon="loadicon" text="加载中"></orange-fullloading>
```

## API

### orange-fullloading Props

|属性名	|类型		|默认值	|说明				|
|:-:	|:-:		|:-:	|:-:				|
|loadicon	|String		|-		|加载图标路径			|
|loadshow	|Boolean		|true		|是否显示	|
|bgcolor	|String		|#ffffff		|全屏加载页面背景色			|
|iconwidth	|Number		|110		|加载图标宽度，单位rpx，填写数字即可	|
|iconheight	|Number		|true		|加载图标高度，单位rpx，填写数字即可	|
|text	|String		|-		|加载文字，不填则不显示	|
|textcolor	|String		|#000000		|加载文字颜色	|
|textsize	|Number		|30		|加载文字大小，单位rpx，填写数字即可	|


## 问题交流

使用过程存在疑问可加QQ群：321879919 在线解决

