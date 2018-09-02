# DOM

## 节点类型 element.nodeType
- 1:元素节点

## 节点关系
- 子节点：element.children
- 父节点：element.parentNode
- 上一个兄弟节点：element.previousSibling
- 下一个兄弟节点：element.nextSibling
- 第一个字节点：element.firstChild
- 最后一个字节点：element.lastChild
- 追加子节点：element.appendChild(node)
- 添加字节点：element.insertBefore(newNode,node)
    - 往前追加：element.insertBefore(node,element.children[0])
- 克隆节点：element.cloneNode(true/false)

## 元素获取
- html:`document.documentElement`
- body:`document.body`
- title:`document.title`
- id:`element.id`
- class:`element.className`

## 263