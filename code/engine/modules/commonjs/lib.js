let count = 3

const obj = { a: 1 }

module.exports = {
    count,
    get countGet() {
        return count
    },
    add() {
        count += 1
    },
    obj,
    addObj() {
        obj.a += 1
    }
}