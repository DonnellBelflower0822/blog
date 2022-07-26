
interface Options {
    // 指定调用在节流开始前。
    leading?: boolean
    // 指定调用在节流结束后。
    trailing?: boolean
}

function throttle(fn: (...args: unknown[]) => void, ms = 50, options: Options = {}) {
    
}