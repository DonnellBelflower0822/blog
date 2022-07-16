var num = 1;
var myObject = {
    num: 2,
    add: function () {
        this.num = 3;
        /**
        1. function fn(){console.log(this.num);this.num = 4}
        2. fn()
        3. window.fn()
        */
        (function () {
            // this = window
            console.log(this.num);  // 1
            this.num = 4;   // window.num = 4
        })();
        console.log(this.num);  // 3
    },
    sub: function () {
        console.log(this.num)
    }
}

myObject.add();
console.log(myObject.num);  // 3
console.log(num);   // 4
var sub = myObject.sub;
sub();  // 4