# 乾坤

## 微前端
- 技术栈无关
- 独立开发, 独立部署
- 增量升级
- 独立运行

## 为什么不要iframe

- url不同步, 浏览器刷新, iframe url状态丢失
- ui不同步, DOM结构不共享, 一个小iframe要一个弹窗在整个页面居中
- 全局上下文完全隔离, 内容变量不共享
- 每次子应用都是一次浏览器上下文重载,资源重新加载的过程

## html entry/js entry

### js entry的缺点
- 子应用更新打包 js bundle会变化, 主应用需要获取最新的js bundle
- 子应用都打包到一个文件, 加载速度慢



