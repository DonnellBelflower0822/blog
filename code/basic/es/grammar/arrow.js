const foo = () => {
    console.log(this)
    console.log(arguments)
}

new foo()

yield foo()