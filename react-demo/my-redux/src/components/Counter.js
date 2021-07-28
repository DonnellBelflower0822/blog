import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as counterActions from '../store/actions/couter'

function Counter(props) {
  return (
    <div>
      <button
        onClick={() => {
          props.desc(2)
        }}
      >-</button>
      <span>{props.count}</span>
      <button
        onClick={() => {
          // 传递参数
          props.add_sync(22)
        }}
      >+</button>
      <button
        onClick={() => {
          console.log(props)
        }}
      >+</button>
    </div>
  )
}

const mapStateToProps = ({ counter }) => ({
  count: counter.count
})

// const mapDispatchToProps = dispatch => ({
//   add(payload) {
//     dispatch({ type: 'add', payload })
//   },
//   desc(payload) {
//     dispatch({ type: 'desc', payload })
//   }
// })

// const mapDispatchToProps = dispatch => ({
//   ...bindActionCreators({
//     add(payload) {
//       return { type: 'add', payload }
//     },
//     desc(payload) {
//       return { type: 'desc', payload }
//     }
//   }, dispatch)
// })

const mapDispatchToProps = dispatch => (bindActionCreators(counterActions, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(Counter)