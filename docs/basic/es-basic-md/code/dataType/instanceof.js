console.log(
  true instanceof Boolean,  // false
  'string' instanceof String, // false
  10 instanceof Number,   // false
  Symbol() instanceof Symbol, // false
  BigInt(20) instanceof BigInt, // false

  // 报错
  // undefined instanceof undefined,
  // null instanceof null,

  {} instanceof Object, // true
  {} instanceof Array,  // false

  [] instanceof Object, // true
  [] instanceof Array,  // true

  console.log instanceof Object, // true
  console.log instanceof Function,  // true
)