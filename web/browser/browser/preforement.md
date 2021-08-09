# 性能

- 降低请求量：
  - 合并资源，减少 HTTP 请求数，
  - minify / gzip 压缩，webP，lazyLoad。
- 加快请求速度：
  - 预解析 DNS，减少域名数，并行加载，CDN 分发。
- 缓存：
  - HTTP 协议缓存请求，
  - 离线缓存 manifest，
  - 离线数据缓存localStorage。
- 渲染：
  - JS/CSS 优化，加载顺序，服务端渲染，pipeline

## 缓存
- 强缓存
  - 相关字段有 expires，cache-control。
  - 如果 cache-control 与expires 同时存在的话， cache-control 的优先级高于 expires。
- 协 商 缓 存 
  - 相 关 字 段 有 Last-Modified/If-Modified-Since ，Etag/If-None-Match

## 浏览器输入网址到页面渲染的全过程
- 根据网址通过DNS找到ip
- 建立tcp/IP连接
- 发送http请求
- 服务器处理请求并返回http报文
- 浏览器解析并渲染页面

## 回流/重绘
- 回流: 当 render tree 中的一部分或者全部因为元素的规模尺寸，布局，隐藏等改变而需要重新构建
- 重绘: 当 render tree 中的一些元素需要更新属性，而这些属性只是影响元素的外观，不会影响布局

## http
> 超文本传输协议

**特点**
- 无状态
- 基于请求-响应模式




