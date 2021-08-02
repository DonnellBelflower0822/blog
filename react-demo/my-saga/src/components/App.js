import { useDispatch, useSelector } from 'react-redux'
import { add, add_sync } from '../store/actions/counter';
function App() {
  const counter = useSelector((state) => state.counter)
  const dispatch = useDispatch()
  return (
    <div className="App">
      <p>{counter.count}</p>
      <button onClick={() => {
        dispatch(add())
      }}>同步加1</button>
      <button onClick={() => {
        dispatch(add_sync())
      }}>异步加1</button>
    </div>
  );
}

export default App;
