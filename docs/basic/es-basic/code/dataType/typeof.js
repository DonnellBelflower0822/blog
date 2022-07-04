console.log(
  typeof 'string',  // string
  typeof 10,  // number
  typeof true,  // boolean
  typeof null,  // object
  typeof undefined, // undefined
  typeof Symbol(),  // symbol
  typeof BigInt(10),  //  bigint
)

console.log(
  typeof {},  // object
  typeof [],  // object
  typeof new Date(),  // object
  typeof /\d/,  // object
  typeof console.log, // function
)