# CSS
## 清单
- 离线储存
- 浏览器内核
- flex
- 媒体查询
- meta
- 视差滚动效果
- 布局
> https://juejin.im/post/5aa252ac518825558001d5de

- BFC
> https://juejin.im/post/59b73d5bf265da064618731d

- 居中大法

## 语义化
- 用正确的标签做正确的事情！
- html语义化就是让页面的内容结构化，便于对浏览器、搜索引擎解析；
- 在没有样式CSS情况下也以一种文档格式显示，并且是容易阅读的。
- 搜索引擎的爬虫依赖于标记来确定上下文和各个关键字的权重，利于 SEO。
- 使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解

## 行内元素，块元素
- 行内元素：span，a，strong
- 块元素：div，p，ul,li
- 空标签：hr，br

## 浏览器内核
- 渲染引擎：渲染html，css，图片等
- js引擎：解析和执行javascript实现网页的动态效果

### ？常见内核
- webkit:chrome，safari
- Gecko:FF
- Presto：opera
- Trident：ie

## html5
### 兼容性
- 使用document.createElement
- 加上默认样式

### 新增语义化标签
<img src="./img/html5-layout.jpg" width=600/> 

### ? 离线储存manifest


## 盒子模型
### w3c盒子
- box-sizing:content-box;
- 盒子真实宽度: `border-left + padding-left + width + padding-right + border-right`

<img src="./img/box1.png" width=600>

### ie盒子
- box-sizing:border-box;
- 内容真实宽度: `width - (border-left + padding-left + padding-right + border-right)`

<img src="./img/box2.png" width=600>

## `display:none`与`visibility:hidden`的区别
- 相同：隐藏元素
- 不同：
  - `display:none`不占位置，`visibility:hidden`占位置
  - 在子元素设置`visibility:visible`子元素不隐藏
  - `display:none`是非继承，子孙节点的消失是由于父元素从渲染树中移除
  - `visibility:visible`是继承，子孙节点的消失是由于继承父节点的属性从而消失的
  
## 1px高的线
```css
.px1 {
  height: 1px;
  overflow: hidden;
  background-color: red;
}
```

## css继承
- font-字体类
- line-height
- color
- visibility
- text-

## 选择器优先级
```
!important > 内联 > id > class > tag 
```

## 清除浮动
```css
.clearfix:after{
  content:'';
  display: table;
  height: 0;
  clear: both;
}
.clearfix{
  *zoom:1;
}
```

## 页面布局
### 3拦布局，中间自适应
- float
> 注意.content1的位置
```html
<style>
.left1 {
  float: left;
  width: 300px;
}
.right1 {
  float: right;
  width: 300px;
}

</style>
<div class="main1">
  <div class="left1"></div>
  <div class="right1"></div>
  <div class="content1">
    <h1>111</h1>
  </div>
</div>
```

- `postition:absoulte`
```html
<style>
.main2 { position: relative; }

.main2 > div { position: absolute; height: 300px; }

.left2 {
  position: absolute;
  left: 0;
  top: 0;
  width: 300px;
  background: red;
}

.content2 {
  position: absolute;
  left: 300px;
  right: 300px;
  background-color: green;
}

.right2 {
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
  background: red;
}
</style>
<div class="main2">
  <div class="content2">
    <h1>111</h1>
  </div>
  <div class="left2"></div>
  <div class="right2"></div>
</div>
```

- `flexbox`

- `table/table-cell`
```html
<style>
.table {
  width: 100%;
  display: table;
  margin-top: 30px;
}

.table > div {
  width: 300px;
  height: 100px;
  background-color: pink;
  display: table-cell;
}

.table > div.table-cell-center {
  width: auto;
  background-color: red;
}
</style>
<div class="table">
  <div class="table-cell-left"></div>
  <div class="table-cell-center"></div>
  <div class="table-cell-right"></div>
</div>
```

## BFC
### 概念
> 块级格式化上下文，解决边距重叠解决方案

### 原理
- bfc元素的盒子会在垂直方向边距会重叠
- bfc元素区域不与浮动元素的box重叠
- bfc元素是一个独立的容器，外面的元素影响不了里面元素，里面元素也不会影响外部元素
- 计算BFC的高度时，浮动元素也会参与计算

### 创建bfc
- 浮动 float不为none
- overflow不为visible
- position不为static，realvtice
- display为table,table-cell

### 使用场景
- 清除浮动
- 解决上下边距重叠问题

