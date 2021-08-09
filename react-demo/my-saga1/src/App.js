import { connect } from 'react-redux'
import { COUNT_ADD, COUNT_ADD_ASYNC, COUNT_DESC } from './store/action-types';

function App(props) {
  return (
    <div className="App">
      <h1>{props.count}</h1>
      <button onClick={() => {
        props.dispatch({ type: COUNT_ADD })
      }}>同步+1</button>
      <button onClick={() => {
        props.dispatch({ type: COUNT_DESC })
      }}>同步-1</button>
      <button onClick={() => {
        props.dispatch({ type: COUNT_ADD_ASYNC })
      }}>异步-1</button>
    </div>
  );
}

export default connect((state) => state.counter)(App);
