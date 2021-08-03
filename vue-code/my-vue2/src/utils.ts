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