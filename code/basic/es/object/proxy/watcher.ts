interface Fn {
    (): void
}
const { observable, observe } = (() => {
    const queuedObserve = new Set<Fn>()

    function observable<T extends Object>(target: T) {
        return new Proxy<T>(target, {
            set(target, p, value, receiver) {
                const bool = Reflect.set(target, p, value, receiver)
                // 执行监听函数
                queuedObserve.forEach(observe => {
                    observe()
                })

                return bool
            }
        })
    }

    function observe(fn: Fn) {
        queuedObserve.add(fn)
    }

    return {
        observable,
        observe
    }
})()


const person = observable({
    name: '张三',
    age: 20
});

function print() {
    console.log('监听', `${person.name}, ${person.age}`)
}

observe(print);
person.name = '李四';

