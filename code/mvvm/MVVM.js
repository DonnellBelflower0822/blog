// 主入口文件，类似vue
// class MVVM {
//   constructor (options) {
//     this.$options = options || {}
//     var data = this._data = this.$options.data
//
//   }
// }

//
// class Compile {
//   constructor (el, vm) {
//
//   }
// }
Array.prototype.push = function () {
  console.log(11)
}

class Observer {
  constructor (data) {
    this.data = data
    this.observe(data)
  }

  observe (data) {
    if (!data || typeof data !== 'object' || data instanceof Array) {
      return
    }
    Object.keys(data).forEach(key => {
      this.defineObserver(key, data[key])
    })
  }

  defineObserver (key, val) {
    // 递归子属性
    this.observe(val)
    let dp = new Dep()
    Object.defineProperty(this.data, key, {
      enumerable: true,
      configurable: true,
      get () {
        if (Dep.target) {
          dp.addSub(Dep.target)
        }
        return val
      },
      set (newVal) {
        console.log('change value')
        val = newVal
        dp.notify()
      }
    })
  }
}

class Dep {
  constructor () {
    this.subs = []
  }

  addSub (sub) {
    this.subs.push(sub)
  }

  notify () {
    this.subs.forEach(sub => sub.update())
  }
}

Dep.target = null

class Watcher {
  constructor (obj, key, cb) {
    Dep.target = this
    this.cb = cb
    this.obj = obj
    this.key = key
    this.value = obj[key]
    Dep.target = null
  }

  update () {
    this.value = this.obj[this.key]
    this.cb(this.value)
  }
}