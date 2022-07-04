(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{316:function(v,_,l){"use strict";l.r(_);var t=l(13),i=Object(t.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("h1",{attrs:{id:"浏览器"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#浏览器"}},[v._v("#")]),v._v(" 浏览器")]),v._v(" "),_("h2",{attrs:{id:"进程与线程"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#进程与线程"}},[v._v("#")]),v._v(" 进程与线程")]),v._v(" "),_("ul",[_("li",[v._v("进程是操作系统资源分配的基本单位,进程包含线程")]),v._v(" "),_("li",[v._v("线程是有进程所管理的,为了提高浏览器的稳定性和安全性,浏览器采用多进程的模型")])]),v._v(" "),_("h2",{attrs:{id:"浏览器多进程"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#浏览器多进程"}},[v._v("#")]),v._v(" 浏览器多进程")]),v._v(" "),_("ul",[_("li",[v._v("浏览器进程\n"),_("ul",[_("li",[v._v("负责页面显示,用户交互,子进程管理,提供存储")])])]),v._v(" "),_("li",[v._v("渲染进程\n"),_("ul",[_("li",[v._v("每个页卡都有单独的渲染进程,用于渲染页面")])])]),v._v(" "),_("li",[v._v("网络进程\n"),_("ul",[_("li",[v._v("处理网络资源加载(html,css,js)")])])]),v._v(" "),_("li",[v._v("插件进程\n"),_("ul",[_("li",[v._v("chrome安装的插件")])])]),v._v(" "),_("li",[v._v("GPU进程\n"),_("ul",[_("li",[v._v("3d绘制,提高性能")])])])]),v._v(" "),_("h2",{attrs:{id:"用户输入url"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#用户输入url"}},[v._v("#")]),v._v(" 用户输入url")]),v._v(" "),_("ul",[_("li",[v._v("用户输入url地址")]),v._v(" "),_("li",[v._v("浏览器进程会准备一个渲染进程用于渲染页面")]),v._v(" "),_("li",[v._v("网络进程加载资源,最终将加载的资源交给渲染进程来处理")]),v._v(" "),_("li",[v._v("渲染完毕显示")]),v._v(" "),_("li",[v._v("网络七层模型\n"),_("ul",[_("li",[v._v("物理层")]),v._v(" "),_("li",[v._v("网络层(IP)")]),v._v(" "),_("li",[v._v("传输层\n"),_("ul",[_("li",[v._v("TCP: 安全可靠,分包传输")]),v._v(" "),_("li",[v._v("UDP: 丢包")])])]),v._v(" "),_("li",[v._v("应用层(HTTP)")])])]),v._v(" "),_("li",[v._v("先去查找缓存, 检测缓存是否过期, 直接返回缓存中内容")]),v._v(" "),_("li",[v._v("看域名是否被解析\n"),_("ul",[_("li",[v._v("DNS协议 将域名解析成IP地址(DNS基于UDP)")])])]),v._v(" "),_("li",[v._v("请求HTTPS ssl协商")]),v._v(" "),_("li",[v._v("ip地址寻址, 排队等待\n"),_("ul",[_("li",[v._v("一个域名最多能发6个http请求")])])]),v._v(" "),_("li",[v._v("tcp创建连接, 用于传输")]),v._v(" "),_("li",[v._v("利用tcp传输数据(拆分数据包, 有序, 可靠)")]),v._v(" "),_("li",[v._v("http请求(请求行,请求头,空行,请求体)")]),v._v(" "),_("li",[v._v("默认不会断开, keep-alive为了下次传输数据时,可以复用上次创建的链接")]),v._v(" "),_("li",[v._v("服务器收到数据后响应(响应行 响应头 空行 响应体)")]),v._v(" "),_("li",[v._v("服务器返回301,302会进行重定向操作")]),v._v(" "),_("li",[v._v("服务器304, 去查询浏览器缓存进行返回")])]),v._v(" "),_("h2",{attrs:{id:"http"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#http"}},[v._v("#")]),v._v(" http")]),v._v(" "),_("ul",[_("li",[v._v("http1.0\n"),_("ul",[_("li",[v._v("提供http的header,根据header的不同处理不同资源")])])]),v._v(" "),_("li",[v._v("http1.1\n"),_("ul",[_("li",[v._v("默认开启keep-alive, tcp链接复用")])])]),v._v(" "),_("li",[v._v("http2.0\n"),_("ul",[_("li",[v._v("用同一个tcp链接来发送数据,一个域名一个tcp")]),v._v(" "),_("li",[v._v("服务其可以推送数据给客户端")])])]),v._v(" "),_("li",[v._v("http3.0\n"),_("ul",[_("li",[v._v("解决tcp的对头阻塞问题")])])])]),v._v(" "),_("h2",{attrs:{id:"浏览器渲染"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#浏览器渲染"}},[v._v("#")]),v._v(" 浏览器渲染")])])}),[],!1,null,null,null);_.default=i.exports}}]);