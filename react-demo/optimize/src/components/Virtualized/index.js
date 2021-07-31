import { List } from 'react-virtualized'
import faker from 'faker'

function createRecord(count) {
  let records = []
  for (let i = 0;i < count;i++) {
    records.push({
      username: faker.internet.userName(),
      email: faker.internet.email()
    })
  }
  return records
}

const records = createRecord(10000)
function rowRenderer({ index, key, style }) {
  const record = records[index]
  return (
    <div style={style} key={key}>
      {record.username}{record.email}
    </div>
  )
}
export default function App() {
  return (
    <List
      width={400}
      height={300}
      rowHeight={30}
      rowCount={records.length}
      rowRenderer={rowRenderer}
    />
  )
}