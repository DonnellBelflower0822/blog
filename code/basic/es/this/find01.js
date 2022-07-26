var obj = {
    say: function () {
        function _say() {
            console.log(this);
        }
        console.log(obj);
        return _say.bind(obj);
    }()
}
obj.say()