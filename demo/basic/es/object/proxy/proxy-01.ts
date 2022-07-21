interface TmpObject {
    a?: unknown
    _a?: number
    _b?: number,
    fn: () => void
}

const source = {
    _a: 1,
    fn() {
        // this指向的是代理后返回的对象
        console.log('', this === source)
        console.log('', this === obj)
    }
}

const obj = new Proxy<TmpObject>(source, {
    // 拦截 obj.a, 
    // obj[xxx]
    get(target, p, receiver) {
        console.log('获取属性名', p, receiver)
        return Reflect.get(target, p, receiver)
    },
    // 拦截 obj.a = 22 
    // obj[xx] = any
    set(target, p, v, receiver) {
        console.log('设置属性的值', p, v)
        return Reflect.set(target, p, v, receiver)
    },
    // 拦截 xx in obj
    has(target, p) {
        if (typeof p === 'string' && p.startsWith('_')) {
            return false
        }

        return Reflect.has(target, p)
    },
    // delete obj[xx]
    deleteProperty(target, p) {
        if (typeof p === 'string' && p.startsWith('_')) {
            return false
        }
        // delete target[p]
        return true
    },
    // obj[new propertyName] = xx
    defineProperty(_, p) {
        if (typeof p === 'string' && p.startsWith('_')) {
            return false
        }
        return true
    },
    // Object.getOwnPropertyNames(obj),
    // Object.getOwnPropertySymbols(obj),
    // Object.keys()
    // for...in循环
    ownKeys(target) {
        console.log(target)
        return ['a']
    }
}
)

console.log(obj.a)

obj.a = 2

console.log('_a' in obj)

// console.log(delete obj['_a'])

// TypeError: 'set' on proxy: trap returned falsish for property '_b'
// obj._b = 3

console.log(
    Object.getOwnPropertyNames(obj),
    Object.getOwnPropertySymbols(obj),
    Reflect.ownKeys(obj)
)

obj.fn()