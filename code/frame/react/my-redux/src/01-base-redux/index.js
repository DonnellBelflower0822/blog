import { createStore } from './redux'

const ADD = 'ADD'
const MINUS = 'MINUS'
const reducer = (state, action) => {
    switch (action.type) {
        case ADD:
            return { ...state, count: state.count + 1 }
        case MINUS:
            return { ...state, count: state.count - 1 }
        default:
            return { ...state }
    }
}
const store = createStore(reducer, { count: 1 })
console.log(store.getState())

const root = document.getElementById('root')
function render() {
    root.innerHTML = store.getState().count
}

render()

store.subscribe(render)

const btn1 = document.getElementById('btn1')
btn1.addEventListener('click', () => {
    store.dispatch({ type: ADD })
})

const btn2 = document.getElementById('btn2')
btn2.addEventListener('click', () => {
    store.dispatch({ type: MINUS })
})

