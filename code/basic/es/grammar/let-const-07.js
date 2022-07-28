function f() {
    console.log('I am outside!');
}

(function () {
    if (false) {
        // 重复声明一次函数f
        function f() {
            console.log('I am inside!');
        }
    }

    f();    // TypeError: f is not a function
}());

(function () {
    let f = undefined
    if (false) {
        // 重复声明一次函数f
        f = function () {
            console.log('I am inside!');
        }
    }

    f();    // TypeError: f is not a function
}());
