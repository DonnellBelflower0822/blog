const fn = () => {
  console.log(this)

  // Uncaught ReferenceError: arguments is not defined
  console.log(arguments)
}

fn(1, 2, 3)

// TypeError: fn is not a constructor
// new fn()


const a = () => { }

yield a()