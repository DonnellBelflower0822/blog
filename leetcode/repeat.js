function noRepeat(str) {
  let noRepeatStr = ''

  for (let i = 0;i < str.length;i += 1) {
    if (str.indexOf(str[i]) === i) {
      noRepeatStr += str[i]
    }
  }
  return noRepeatStr
}

console.log(noRepeat("abcabcbb"))
console.log(noRepeat("bbbbb"))
console.log(noRepeat("pwwkew"))
