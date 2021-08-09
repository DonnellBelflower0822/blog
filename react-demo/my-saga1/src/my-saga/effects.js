import { FORK, PUT, TAKE } from './effectType';

// 监听事件
export function take(actionType) {
  return { type: TAKE, actionType }
}

// 派发动作
export function put(action) {
  return { type: PUT, action }
}

export function fork(saga) {
  return { type: FORK, saga }
}

export function takeEvery(actionType, saga) {
  function* takeEveryHelper() {
    while (true) {
      yield take(actionType)  // 等待新的动作类型
      yield fork(saga)  // 开启一个新的子进程执行saga
    }
  }

  return fork(takeEveryHelper)
}
