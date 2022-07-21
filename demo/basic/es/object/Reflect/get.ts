const obj = {
    a: 1,
    b: 2,
    get c() {
        return this.a + this.b
    }
}

console.log(Reflect.get(obj, 'a'))  // 1
console.log(Reflect.get(obj, 'b'))  // 2
console.log(Reflect.get(obj, 'c', { a: 3, b: 4 }))  // 7