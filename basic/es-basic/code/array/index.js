const arr = [
  { id: 1, name: 'allen' },
  { id: 2, name: 'tom' },
  { id: 3, name: 'jack' },
  { id: 2, name: 'tim' },
]

const res = arr.find(item => item.id === 2)
console.log(res)  // { id: 2, name: 'tom' }

const index = arr.findIndex(item => item.id === 2)
console.log(index)  // 1