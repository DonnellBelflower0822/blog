// 同步钩子
class SyncHook {
    constructor () {
        this.tasks = []
    }

    // 注册钩子
    tap(name, task) {
        this.tasks.push(task)
    }

    call(...args) {
        this.tasks.forEach(task => {
            task(...args)
        })
    }
}

exports.SyncHook = SyncHook
