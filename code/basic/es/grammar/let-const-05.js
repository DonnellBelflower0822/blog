
let a = 1
function fn(x = y, y = 2) {
    return [x, y]
}

fn(1, 2)