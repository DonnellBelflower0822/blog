import { connect } from '../dva'

function App(props) {
  return (
    <div className="App">
      {props.count}
      <button onClick={() => {
        props.dispatch({ type: 'counter/add' })
      }}>+1</button>
    </div>
  );
}

export default connect(state => state.counter)(App);
