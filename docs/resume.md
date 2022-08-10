# 许晓周

- 手机：18594210822 | 759811542@qq.com | 深圳宝安
- 学历: 肇庆学院 | 思想政治教育 | 本科 | 2013-2017
- 意向岗位：前端工程师
- 期望薪资：面议
- github: https://github.com/xuxiaozhou
- 博客： https://xuxiaozhou.github.io/blog

## 专业技能

- 使用react和vue2全家桶
- 手写react的常用功能的实现
- 使用es6+和typescript
- 使用electron开发客户端
- 使用taro, uni-app开发微信小程序
- 使用webpack，vite，rollup构建工具
- 借助codeup搭建docker化前端和docker化node持续部署

## 工作经历

- 深圳普渡科技有限公司 2021年8月 - 2022年7月
- 深圳酷数科技有限公司 2018年11月 - 2021年6月
- 深圳一米互动有限公司 2017年3月 - 2018年10月

## 项目经验

### CRM销售管理系统（h5/小程序）
- 项目描述：为销售经理提供线索,拜访,客户,门店,方案,工单,数据看板等LTC销售全流程数字化管理, 满足不同角色的销售经理和各种业务类型的销售管理需求
- 开发技术：react,redux,redux-saga,typescript,taro,formily,react-query
- 技术描述：
  - 使用taro作为跨端的开发框架
  - 使用react hook和typescript
  - 封装与formily配合的表单组件, 通过配置schema生成复杂表单
  - 封装redux,redux-saga成dva model的用法
  - 使用react-query简化请求缓存和列表查询等工作

### 运营工作台
- 项目描述：支持运营人员,技术支持和财务同事的综合运营工作台,包含客服工作台，海外运营工作台、财务工作日台
- 开发技术：vue, vue-router, vuex, elementUI, qiankun
- 技术描述：
  - 使用qiankun作为微前端框架, 每个子项目能够独立开发和发布
  - 封装table和form成schema配置的生成表格和表单
  - 动态注册路由

### crm/oms后台管理系统
- 项目描述: 销售管理系统, 支持分配角色权限, 字典等配置
- 开发技术: react, redux, redux-saga, typescript, webpack, antd 
- 技术描述:
  - 从0搭建基于webpack的react全家桶, 并且封装成模板
  - 开发内部的脚手架
  - 封装redux,redux-saga成类似 dva model的用法

### OMS合同管理系统小程序（迁移）
- 项目描述: 将原生的h5项目迁移到小程序
- 开发技术：taro, typescript, react, formily
- 技术描述：
  - 重写小程序不支持的api和组件, axios改成Taro.request
  - 将picker,datePicker组件改用小程序原生组件

### 酷数低码产品

- 项目描述：一款可视化低码的应用搭建平台。采用可视化的方式去编排页面，提供组件库接入能力等丰富页面的功能。
- 开发技术：react，antd，typescript，backbone
- 技术描述：
  - 采用monorepo将页面编辑器拆分为预览/编辑版本,解决各个仓库的分散管理和同步困难的问题
  - 页面编辑器提供插件渲染，更新，选中，拖拽，使用流程的数据的能力
  - 封装通过插件配置数据生成的插件配置表单。即可根据配置生成输入项，也可通过绑定流程数据
  - 使用typescript定义接口, 对插件库的配置数据结构和插件实现的约束
  - 自定义webpack插件，在插件库加载完毕后注册到页面编辑器中
  - 使用typescript和antd开发酷数官方组件库

### 办会家PC签到客户端

- 项目描述：会议现场签到产品，主要解决现场参会人身份的校验(扫描枪签到,身份证签到,RFID签到,自主签到)及胸卡打印等功能; 签到反馈的3D签到大屏和反馈屏
- 开发技术：electron, vue, vue-router, vuex, vue-cli,element-ui,indexdb,node
- 技术描述：
  - 运用vue全家桶和electron进行开发
  - 开启多窗口模式
  - 采用dexie.js(indexdb库)作为离线签到的数据库，对增删改查进行promise化封装
  - 对element-ui封装schema驱动的表格组件
  - 实现可高度自定义自定义胸牌的样式，可添加参会人字段，文字，二维码等元素，也可以调整元素大小和位置
  - 批量生成参会人的签到二维码，并以zip格式提供下载
  - 使用node启动打印程序子进程，实现签到后并打印签到证
  - 使用node 与 c#打包身份证签到程序 通信
  - 使用electron进行打包成window和mac客户端

### 新版报名售票系统

- 项目描述：主要解决大会的官方宣传网址，参会人信息收集和门票购买等功能，根据后台配置可实现展示大会宣传；纯表单的信息提交；门票的选购；优惠券使用；参会人，购票人，发票信息的收集；选择支付方式并完成支付等功能
- 开发技术：vue,vue-router,vuex,element-ui,less,es6
- 技术描述：
  - 运用vue全家桶和组件化开发，es6语法
  - 在vuecli2基础上配置多入口脚手架
  - 对axios进行二次封装，简化请求
  - 采用vue.mixins进行代码逻辑的复用
  - 运用vue-i18n实现网站的多语言
  - 运用媒体查询实现pc端和移动端的自适应
  - 采用组件懒加载，压缩gzip格式，缓存dll文件等方面进行性能优化
  - 根据后台设置实现网站自定义主题色
  - 采用thinkphp5和mysql提供数据接口
  - 配置全局filters和实现vuex的辅助函数等进行代码简化
  - 在全局路由守卫实现会议数据请求和储存vuex，对端进行判断实现同一url可在不同端跳转不同界面

### 《布途微记账》微信公众号

- 项目描述：一款针对服装厂实现开单，记账和查看报表的微信公众号应用。主要功能有3种类型单的开单；可动态新增删除不同商品，不同商品又可输入不同规格的件数；商品管理和根据不同筛选条件查看相对应数据统计。
- 开发技术：vue，vue-router,vuex,mint-ui,axios,es6
- 技术描述：
  - 采用rem的适配方案
  - 通过按需引入组件，压缩gzip格式，异步组件，图片懒加载等方式进行性能优化
  - 对整个应用进行的全局缓存，通过设置路由的meta属性和在修改数据时通过设置vuex和activated钩子实现部分路由的不缓存和某些条件下刷新缓存
  - 运用better-scroll作为列表和轮播图滚动，触底加载更多和下拉刷新的插件
  - 封装客户和商品列表，使其即使页面组件，也可以是另个页面组件的业务组件
  - 在全局路由守卫进行用户登陆状态的判断
  - 使用微信sdk实现微信分享和扫码功能

### 《办会助手》签到小程序/移动端app

- 项目描述：属于签到产品的轻量级解决方案，实现功能有切换签到点，参会人签到和查看参会人签到状态。
- 开发技术：(小程序) mpvue,less,flyjs,es6, (app): apicloud,laravel-mix
- 技术描述：
  - 采用mpvue和vue快速开发
  - 封装组件和使用vue.mixins进行代码的复用
  - 基于flyjs封装ajax请求
  - 对iconfont进行处理实现小程序使用字体图标
  - 运用wx.navigateBack和onShow结合处理连续签到功能（小程序限制路径最多10层）
  - 对apicloud的api进行promise封装
  - 对于多个不同页面的在入口文件相同代码进行提取
