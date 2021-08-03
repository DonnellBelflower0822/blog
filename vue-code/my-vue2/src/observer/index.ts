import { isObject } from 'src/utils';

// 对对象的所有属性进行劫持
class Observer {
  constructor(data) {
    this.walk(data);
  }
  walk(data) {
    Object.keys(data).forEach(key => {
      defineReactive(data, key, data[key]);
    });
  }
}

function defineReactive(obj, key, value) {
  // 递归value,如果是对象,继续劫持
  observe(value);

  Object.defineProperty(obj, key, {
    get() {
      return value;
    },
    set(newVal) {
      // 新设置的值也要递归劫持
      observe(newVal);
      value = newVal;
    }
  });
}

export function observe(data) {
  if (!isObject(data)) {
    return data;
  }

  return new Observer(data);
}