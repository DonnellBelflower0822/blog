import { ADD2, MINUS2 } from "../action-type"

const initialState = { count: 10 }
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD2:
            return { ...state, count: state.count + 1 }
        case MINUS2:
            return { ...state, count: state.count - 1 }
        default:
            return state
    }
}

export default reducer