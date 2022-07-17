const a = {
    name: "allen",
    info: {
        year: '1994'
    }
}

const b = { ...a }
a.name = 'jack'
a.info.year = '1999'

// { name: 'jack', info: { year: '1999' } }
console.log(a)
// { name: 'allen', info: { year: '1999' } }
console.log(b)

