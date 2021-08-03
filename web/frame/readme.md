# 框架篇

## hash和history

**表现形式**

```
# hash
http://192.168.1.104:8081/#/about/12
# history
http://192.168.1.104:8081/about/12?a=1
```

**原理**
- hash
  - 基于锚点
  - onhashchange
  - 改变 `location.hash ='aa'`
- history
  - 基于html5的History API
  - history.pushState()
  - history.replaceState()

**history需要服务器支持**

```
location / {
  try_files $uri $uri/ /index.html;
}
```


























