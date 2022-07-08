// Number('1') => 1
console.log(+'1') // 1

// [].toString => ''
// Number('') => 0
console.log(+[]) // 0

// ['1'].toString => '1'
// Number('1')   => 1
console.log(+['1']) // 1

// ['1','2','3'].toString() => '1,2,3'
// Number('1,2,3')  => NaN
console.log(+['1', '2', '3']) // NaN

// {}.toString() => '[obejct Obect]'
// Number('[obejct Obect]') => NaN
console.log(+{})

/***
  +右边
    1. 基础类型,直接调用Number(xxx)
    2. 引用类型
      2.1 调用valueOf
        2.1.1 返回基本类型,调用Number(xxx)
        2.1.2 走2
      2.2 调用toString
        2.2.1 返回基本类型,调用Number(xxx)
        2.2.2 走2
*/