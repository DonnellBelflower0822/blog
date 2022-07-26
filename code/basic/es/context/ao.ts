function foo(a) {
    var b = 2;
    function c() { }
    var d = function () { };

    b = 3;
}

foo(1);

// 执行foo函数内部前
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: undefined,
    c: reference to function c() { },
    d: undefined
}

// 执行foo函数内部后
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: 2,
    c: reference to function c() { },
    d: reference to function () { };
}