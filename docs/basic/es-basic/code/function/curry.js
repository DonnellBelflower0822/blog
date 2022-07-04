function checkAge(mini) {
  return function (age) {
    return age >= mini
  }
}

const checkAge18 = checkAge(18)