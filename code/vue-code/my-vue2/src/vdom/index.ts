import { isBuiltinTag, isObject } from 'src/utils';

export function createElement(vm, tag, data: { [x: string]: unknown; } = {}, children) {
  if (isBuiltinTag(tag)) {
    return vnode(vm, tag, data, data.key, children);
  }
  const Ctor = vm.$options.components[tag];
  return createrComponent(vm, tag, data, data.key, children, Ctor);
}
export function createTextElement(vm, text) {
  return vnode(vm, undefined, undefined, undefined, undefined, text);
}

function vnode(vm, tag, data: any = {}, key, children, text?, componentOptions?) {
  return {
    vm,
    tag,
    key,
    data,
    children,
    text,
    componentOptions
  };
}

function createrComponent(vm, tag, data, key, children, Ctor) {
  if (isObject(Ctor)) {
    Ctor = vm.$options._base.extend(Ctor);
  }

  data.hook = {
    init() {
      const subVm = new Ctor({ _isComponent: true });
      subVm.$mount();
    }
  };
  return vnode(vm, `vue-component-${tag}`, data, key, undefined, undefined, { Ctor, children });
}