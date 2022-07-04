export const isFunction = (val) => typeof val === 'function';

export const isObject = (val) => val !== null && typeof val === 'object';

let waiting = false;
const callbacks = [];

let timerFn;
if (Promise) {
  timerFn = () => { Promise.resolve().then(flushCallbacks); };
} else if (MutationObserver) {
  const textNode = document.createTextNode('1');
  const observe = new MutationObserver(flushCallbacks);
  observe.observe(textNode, { characterData: true });
  timerFn = () => {
    textNode.textContent = '2';
  };
} else if (setImmediate) {
  timerFn = () => {
    setImmediate(flushCallbacks);
  };
} else {
  timerFn = () => {
    setTimeout(flushCallbacks);
  };
}

function flushCallbacks() {
  callbacks.forEach(cb => cb());
  waiting = false;
}

export const nextTick = (cb) => {
  callbacks.push(cb);
  if (!waiting) {
    waiting = true;
    timerFn();
  }
};

const lifecycleHooks = ['beforeCreate', 'created', 'beforeMount', 'mounted'];

const stats = {
  components(parentVal, childVal) {
    const options = Object.create(parentVal);
    if (childVal) {
      for (const key in childVal) {
        options[key] = childVal[key];
      }
    }

    return options;
  }
};
lifecycleHooks.forEach(key => {
  stats[key] = (parentVal, childVal) => {
    if (childVal) {
      if (parentVal) {
        return [...parentVal, childVal];
      } else {
        return [childVal];
      }
    } else {
      return parentVal;
    }
  };
});

// {} {beforeCreate:fn} => {beforeCreate:[fn]}
// {beforeCreate:[fn]} {beforeCreate:fn} => {beforeCreate:[fn,fn]}
export function mergeOptions(parent, child = {}) {
  const options = {};
  for (let key in parent) {
    mergeField(key);
  }

  for (let key in child) {
    if (parent[key] === undefined) {
      mergeField(key);
    }
  }

  function mergeField(key) {
    const parentVal = parent[key];
    const childVal = child[key];

    if (stats[key]) {
      options[key] = stats[key](parentVal, childVal);
    } else {
      if (isObject(parentVal) && isObject(childVal)) {
        options[key] = { ...parentVal, ...childVal };
      } else {
        options[key] = childVal || parentVal;
      }
    }
  }

  return options;
}

export function isBuiltinTag(str) {
  const builtinTags = ['div'];
  return builtinTags.includes(str);
}