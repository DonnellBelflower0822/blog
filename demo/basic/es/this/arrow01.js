function Foo() {
    this.sayArrow = () => {
        console.log(this)
    }
}

const f = new Foo()

const { sayArrow } = f

sayArrow()  // Foo{sayArrow:f}
f.sayArrow.call({ a: 1 })  // Foo{sayArrow:f}
sayArrow.call({ a: 1 })  // Foo{sayArrow:f}