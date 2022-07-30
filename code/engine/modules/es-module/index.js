import { count, add, obj } from "./lib.js";

console.log(count)  // 0
add()
console.log(count)  // 1

// Uncaught TypeError: Assignment to constant variable.
// count = 1

console.log(obj)    // {a:1}
obj.a = 2
console.log(obj)    // {a:2}


