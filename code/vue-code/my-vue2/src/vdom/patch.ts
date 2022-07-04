/**
 * 渲染和更新
 * @param oldVnode 第一次渲染会传入真实dom,更新会传入上次的vnode
 * @param newVnode  新的vnode
 */
export function patch(oldVnode, newVnode) {
  if (!oldVnode) {
    console.log(1);
    return;
  }
  
  if (oldVnode.nodeType === 1) {
    // 渲染
    const parentElm = oldVnode.parentNode;
    const elm = createElm(newVnode);
    parentElm.insertBefore(elm, oldVnode.nextSibling);
    parentElm.removeChild(oldVnode);

    return elm;
  }

  // 更新
}

function createComponent(vnode) {
  let i = vnode.data;

  // i = i.hook?.init
  if ((i = i.hook) && (i = i.init)) {
    i();
  }
  return false;
}

// 根据vnode创建真实dom
function createElm(vnode) {
  const { vm, tag, key, data, children, text } = vnode;
  if (typeof tag === 'string') {

    if (createComponent(vnode)) {

    }
    // el指向真实节点
    vnode.el = document.createElement(tag);

    children.forEach(child => {
      vnode.el.appendChild(createElm(child));
    });
  } else {
    vnode.el = document.createTextNode(text);
  }

  return vnode.el;
}