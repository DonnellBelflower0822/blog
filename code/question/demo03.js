// 输出 
// 大家好我是Tom 
// 1s 之后 
// 我在玩王者 
// 2s 之后 
// 我在玩跳一跳

class PlayBoy {
    constructor (name) {
        this.name = name
    }

    sayHi() {
        console.log('大家好我是' + this.name)
        return this
    }

    sleep(time) {
        const now = Date.now()
        while (Date.now() - now < time) {
        }
        return this
    }

    play(game) {
        console.log('我在玩' + game)
        return this
    }
}

const boy = new PlayBoy('Tom')
boy.sayHi().sleep(1000).play('王者').sleep(2000).play('跳一跳')

