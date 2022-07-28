import { createStore } from "../../core/redux"
import rootReducer from "./reducer"

const store = createStore(rootReducer)

export default store