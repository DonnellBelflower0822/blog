import { scheduleUpdate } from './react-dom'
import { shallowEqual } from './utils'

const hooks = []
let hookIndex = 0

const forceUpdate = () => {
    hookIndex = 0
    scheduleUpdate?.()
}

export const useState = (initialStateOrInitialStateFn) => {
    const currentHookIndex = hookIndex

    hooks[currentHookIndex] = (
        hooks[currentHookIndex]
        ?? (
            typeof initialStateOrInitialStateFn === 'function'
                ? initialStateOrInitialStateFn()
                : initialStateOrInitialStateFn
        )
    )

    function setState(newState) {
        hooks[currentHookIndex] = typeof newState === 'function'
            ? newState(hooks[currentHookIndex])
            : newState
        forceUpdate()
    }

    return [
        hooks[hookIndex++],
        setState
    ]
}

export const useCallback = (callback, deps) => {
    // 初始化
    if (!hooks[hookIndex]) {
        hooks[hookIndex++] = [callback, deps]
        return callback
    }

    const [prevCallback, prevDeps] = hooks[hookIndex]
    // 比较依赖
    if (shallowEqual(prevDeps, deps)) {
        hookIndex++
        return prevCallback
    }

    // 重新
    hooks[hookIndex++] = [callback, deps]
    return callback
}

export const useMemo = (factory, deps) => {
    if (!hooks[hookIndex]) {
        const computedValue = factory()
        hooks[hookIndex++] = [computedValue, deps]
        return computedValue
    }

    const [prevComputedValue, prevDeps] = hooks[hookIndex]

    if (shallowEqual(prevDeps, deps)) {
        hookIndex++
        return prevComputedValue
    }

    const computedValue = factory()
    hooks[hookIndex++] = [computedValue, deps]
    return computedValue
}

export const useReducer = (reducer, initArg, init) => {
    const currentHookIndex = hookIndex
    if (!hooks[hookIndex]) {
        const state = typeof init === 'function' ? init(initArg) : initArg
        const dispatch = (action) => {
            const [lastState] = hooks[currentHookIndex]
            hooks[currentHookIndex][0] = reducer(lastState, action)

            forceUpdate?.()
        }

        hooks[hookIndex++] = [state, dispatch]
        return [state, dispatch]
    }

    return hooks[hookIndex++]
}

export const useContext = (Context) => {
    return Context.Provider._value
}

export const useEffect = (callback, deps) => {
    const currentHookIndex = hookIndex

    if (!hooks[hookIndex]) {
        setTimeout(() => {
            const destoryFn = callback()
            hooks[currentHookIndex] = [destoryFn, deps]
        })
        hookIndex++
        return
    }

    const [destoryFn, lastDeps] = hooks[hookIndex]

    if (deps && shallowEqual(deps, lastDeps)) {
        hookIndex++
        return
    }

    destoryFn?.()
    setTimeout(() => {
        const destoryFn = callback()
        hooks[currentHookIndex] = [destoryFn, deps]
    })
    hookIndex++
}

export const useLayoutEffect = (callback, deps) => {
    const currentHookIndex = hookIndex

    if (!hooks[hookIndex]) {
        queueMicrotask(() => {
            const destoryFn = callback()
            hooks[currentHookIndex] = [destoryFn, deps]
        })
        hookIndex++
        return
    }

    const [destoryFn, lastDeps] = hooks[hookIndex]

    if (deps && shallowEqual(deps, lastDeps)) {
        hookIndex++
        return
    }

    destoryFn?.()
    queueMicrotask(() => {
        const destoryFn = callback()
        hooks[currentHookIndex] = [destoryFn, deps]
    })
    hookIndex++
}

export const useRef = (initialRef) => {
    if (hooks[hookIndex] === undefined) {
        hooks[hookIndex] = { current: initialRef }
    }

    return hooks[hookIndex++]
}

export const useImperativeHandle = (ref, createHandle, deps) => {
    if (!hooks[hookIndex]) {
        const handle = createHandle()
        for (const key in handle) {
            ref.current[key] = handle[key]
        }
        hooks[hookIndex++] = [deps]
        return
    }

    const [lastDeps] = hooks[hookIndex]

    if (shallowEqual(lastDeps, deps)) {
        hookIndex++
        return
    }

    const handle = createHandle()
    for (const key in handle) {
        ref.current[key] = handle[key]
    }
    hooks[hookIndex++] = [deps]
}