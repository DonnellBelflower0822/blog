import { combineReducers } from 'redux'

function getPartReducer(model) {
    return function (state = model.state, action) {
        const reducer = model.reducers[action.type]
        if (reducer) {
            return reducer(state, action)
        }

        return state
    }
}

export const createRootReducer = (models) => {
    const initialReducers = {}
    models.forEach(model => {
        // {
        //      a:(state,action)=>{return state}
        //      b: (state,action)=>{return state}
        // }
        // 将model的reducer对象转成reducer函数
        initialReducers[model.namespace] = getPartReducer(model)
    })

    // 多个reducer合并成根rootReducer
    const rootReducer = combineReducers(initialReducers)

    return rootReducer
}