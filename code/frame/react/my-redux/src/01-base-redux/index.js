import {
    createStore,
    bindActionCreators
} from '../core/redux'

const ADD = 'ADD'
const MINUS = 'MINUS'
const reducer = (state = { count: 1 }, action) => {
    const { type, payload = 1 } = action
    switch (type) {
        case ADD:
            return { ...state, count: state.count + payload }
        case MINUS:
            return { ...state, count: state.count - payload }
        default:
            return { ...state }
    }
}
const store = createStore(reducer)

const root = document.getElementById('root')
function render() {
    root.innerHTML = store.getState().count
}

const minus = (payload) => ({ type: MINUS, payload })
const actions = bindActionCreators({ minus }, store.dispatch)

render()

store.subscribe(render)

const btn1 = document.getElementById('btn1')
btn1.addEventListener('click', () => {
    store.dispatch({ type: ADD })
})

const btn2 = document.getElementById('btn2')
btn2.addEventListener('click', () => {
    // store.dispatch({ type: MINUS })
    actions.minus(2)
})

