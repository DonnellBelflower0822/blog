import { createStore } from 'redux'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { fromJS } from 'immutable'

function Page() {
  const man = useSelector(state => state)
  const dispatch = useDispatch()
  return (
    <>
      <div>{man.name}</div>
      <div>{man.age}</div>
      <div>{man.get('name')}</div>
      <div>{man.get('age')}</div>
      <button onClick={() => { dispatch({ type: "ADD" }) }}>+1</button>
      <button onClick={() => { dispatch({ type: "DESC" }) }}>-1</button>
    </>
  )
}

// const initailState = { name: 'allen', age: 27 }
// const reducer = (state = initailState, action) => {
//   switch (action.type) {
//     case "ADD":
//       return {
//         ...state,
//         age: state.age + 1
//       }
//     case "DESC":
//       return {
//         ...state,
//         age: state.age - 1
//       }
//     default:
//       return state
//   }
// }

const initailState = fromJS({ name: 'allen', age: 27 })
const reducer = (state = initailState, action) => {
  const age = state.get('age')
  switch (action.type) {
    case "ADD":
      return state.set('age', age + 1)
    case "DESC":
      return state.set('age', age - 1)
    default:
      return state
  }
}

const store = createStore(reducer)

export default function App() {
  return (
    <Provider store={store}>
      <Page />
    </Provider>
  )
}

