import { connect } from '../tinyReactRedux'
import { bindActionCreators } from 'redux'
import * as modalAction from '../store/actions/modal'

function Modal({ visible, toggle, toggle_sync }) {
  const style = {
    width: '100px',
    height: '100px',
    background: 'red',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate3d(-50%,-50%,0)',
    display: visible ? 'block' : 'none'
  }
  return (
    <div>
      <button onClick={toggle}>显示</button>
      <button onClick={toggle_sync}>隐藏</button>
      <div style={style}></div>
    </div>
  )
}

export default connect(
  ({ modal }) => ({ visible: modal.visible }),
  dispatch => (bindActionCreators(modalAction, dispatch))
)(Modal)