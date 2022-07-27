import { ADD1 } from "../action-type"

const initialState = { count: 1 }
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD1:
            return { ...state, count: state.count + 1 }
        case ADD2:
            return { ...state, count: state.count + 2 }
        default:
            return state
    }
}

export default reducer