// 把reducers对象变成reducer函数
export const combineReducers = (reducers) => {
    return function rootReducer(state = {}, action) {
        const nextState = {}

        for (const key in reducers) {
            nextState[key] = reducers[key](state[key], action)
        }

        return nextState
    }
}   