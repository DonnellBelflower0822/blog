# html/css

## 盒子模型
```css
#box1 {
  width: 100px;
  height: 100px;
  border: 10px solid red;
  padding: 20px;
  background: green;
  /* 
  盒子宽度: width+border-left-width + border-right-width + padding-left + padding-right,
  内容宽度: width
  */
  box-sizing: content-box;
}

#box2 {
  width: 100px;
  height: 100px;
  border: 10px solid red;
  padding: 20px;
  background: green;
  /* 
  盒子宽度: width, 
  真实内容宽度: width - padding-left - padding-right - border-left-width - border-right-width
    */
  box-sizing: border-box;
}
```

## html5
### 语义化标签

**好处**
- 提升可访问性 
- seo 
- 结构清晰，利于维护

**标签**
- header,footer,main
- nav,aside,article
- section

### 动画
```css
div {
  width: 100px;
  height: 100px;
  background-color: red;
  position: relative;
  animation-name: example;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  /* 
  动画方向: 
  noramal: (0% -> 25% -> 75% -> 100%) -> (0% -> 25% -> 75% -> 100%) -> ...
  reverse: (100% -> 75% -> 25% -> 0%) -> (100% -> 75% -> 25% -> 0%) -> ....
  alternate: (0% -> 25% -> 75% -> 100% -> 100% -> 75% -> 25% -> 0%) -> (0% -> 25% -> 75% -> 100% -> 100% -> 75% -> 25% -> 0%) -> 
  alternate-reverse: (100% -> 75% -> 25% -> 0% -> 0% -> 25% -> 75% -> 100%) -> (100% -> 75% -> 25% -> 0% -> 0% -> 25% -> 75% -> 100%)
  */
  animation-direction: alternate-reverse;
}

@keyframes example {
  0% {
    background-color: red;
    left: 0px;
    top: 0px;
  }

  25% {
    background-color: yellow;
    left: 200px;
    top: 0px;
  }

  50% {
    background-color: blue;
    left: 200px;
    top: 200px;
  }

  75% {
    background-color: green;
    left: 0px;
    top: 200px;
  }

  100% {
    background-color: red;
    left: 0px;
    top: 0px;
  }
}
```

## 清除浮动
- 高度塌陷: 当所有的子元素浮动的时候，且父元素没有设置高度，这时
候父元素就会产生高度塌陷

```css
.box {
  background: red;
  /* 1. 给父类设置height */
  /* height: 100px; */

  /* 2. 给父类设置overflow:hidden; */
  /* overflow: hidden; */

  /* 4. 给父类设置overflow:auto */
  /* overflow: auto; */
}

/* 5. 给父类增加伪类 */
.box::after {
  content: '';
  clear: both;
  display: block;
  height: 0;
  overflow: hidden;
}

/* 3. 增加空标签 */
.box .clearfix {
  clear: both;
  height: 0;
  overflow: hidden;
}
```

## 垂直居中

```css
.item1 {
  margin: 0 auto;
  width: 100px;
  height: 100px;
  background: red;
}

.box2 {
  text-align: center;
}

.box2 .item2 {
  width: 100px;
  height: 100px;
  background: red;
  display: inline-block;
}

.box3 {
  position: relative;
  height: 150px;
}

.box3 .item3 {
  width: 100px;
  height: 100px;
  display: block;
  background: red;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.box4 {
  position: relative;
  height: 150px;
}

.box4 .item4 {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  width: 100px;
  height: 100px;
  background: red;
}

.box5 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
}
.box5 .item5 {
  width: 100px;
  height: 100px;
  background: red;
}
```



