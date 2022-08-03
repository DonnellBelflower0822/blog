const obj = {
    say: function () {
        (function () {
            // window
            console.log(this)
        })()
    },
    say1: () => {
        (() => {
            // obj
            console.log(this)
        })()
    }
}

obj.say()
obj.say1()