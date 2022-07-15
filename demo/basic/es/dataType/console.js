var a = { name: '前端开发' }
var b = a;
// 只是把a在栈存储改为null, 
// b的引用地址没变
a = null;
console.log(b)


