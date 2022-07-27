import { ALL, CALL, CPS, FORK, PUT, TAKE } from "./effectTypes"

export const take = (actionType) => {
    return { type: TAKE, actionType }
}

export const put = (action) => {
    return { type: PUT, action }
}

export const takeEvery = (actionType, saga) => {
    function* takeEveryHelper() {
        while (true) {
            // 等待新的进程
            yield take(actionType)
            // 开启新子进程执行saga
            yield fork(saga)
        }
    }

    return fork(takeEveryHelper)
}

export const fork = (saga) => {
    return { type: FORK, saga }
}

export const call = (fn, ...args) => {
    return { type: CALL, fn, args }
}

export const cps = (fn, ...args) => {
    return { type: CPS, fn, args }
}

export const all = (effects) => {
    return { type: ALL, effects }
}