const a = {
  toString() {
    return 'toString'
  },
  valueOf() {
    return 'valueOf';
  },
  [Symbol.toPrimitive]() {
    return 'Symbol.toPrimitive';
  }
}

console.log(`${a}`)

const b = {
  toString() {
    return 'b toString'
  },
  valueOf() {
    return 'b valueOf';
  }
}

console.log(`${b}`)