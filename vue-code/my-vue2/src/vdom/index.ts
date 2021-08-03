export function createElement(vm, tag, data: { [x: string]: unknown; } = {}, children) {
  return vnode(vm, tag, data, data.key, children);
}
export function createTextElement(vm, text) {
  return vnode(vm, undefined, undefined, undefined, undefined, text);
}

function vnode(vm, tag, data = {}, key, children, text?) {
  return {
    vm,
    tag,
    key,
    data,
    children,
    text
  };
}
