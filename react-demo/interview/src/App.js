import VList from './components/VList'
import { listLength, list } from './components/mock'
// 可视范围高度
const userVisibleHeight = 500;
// 每一项的高度
const estimateRowHeight = 94;
// 
const bufferSize = 5;

function App() {
  return (
    <div className="App">
      <VList
        list={list}
        total={listLength}
        userVisibleHeight={userVisibleHeight}
        estimateRowHeight={estimateRowHeight}
        bufferSize={bufferSize}
      />
    </div>
  );
}

export default App;
