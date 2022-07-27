import count1 from './count1'
import count2 from './count2'
import { combineReducers } from '../../redux'

const rootReducer = combineReducers({
    count1,
    count2
})

export default rootReducer
