export function createDOMElement(fiber) {
  if (fiber.type === 'text') {
    return document.createTextNode(fiber.props.textContent)
  }

  const element = document.createElement(fiber.type)
  // 处理属性
  updateNodeElement(element, fiber)
  return element
}

export function updateNodeElement(newElement, newFiber, prevFiber = {}) {
  const { props: newProps = {}, type } = newFiber
  const { props: oldProps = {} } = prevFiber

  if (type === 'text') {
    if (newProps.textContent !== prevFiber.textContent) {
      if (newFiber.return.type === prevFiber.return.type) {
        newFiber.return.stateNode.replaceChild(
          document.createTextNode(newProps.textContent),
          prevFiber.stateNode
        )
      } else {
        // 新旧fiber的父级类型不同,也是新加
        newFiber.return.stateNode.appendChild(
          document.createTextNode(newProps.textContent)
        )
      }
    }
    return
  }

  Object.keys(newProps).forEach(propName => {
    // 获取属性值
    const newPropsValue = newProps[propName]
    const oldPropsValue = oldProps[propName]
    if (newPropsValue !== oldPropsValue) {
      // 判断属性是否是否事件属性 onClick -> click
      if (propName.slice(0, 2) === "on") {
        // 事件名称
        const eventName = propName.toLowerCase().slice(2)
        // 为元素添加事件
        newElement.addEventListener(eventName, newPropsValue)
        // 删除原有的事件的事件处理函数
        if (oldPropsValue) {
          newElement.removeEventListener(eventName, oldPropsValue)
        }
      } else if (propName === "value" || propName === "checked") {
        newElement[propName] = newPropsValue
      } else if (propName !== "children") {
        if (propName === "className") {
          newElement.setAttribute("class", newPropsValue)
        } else {
          newElement.setAttribute(propName, newPropsValue)
        }
      }
    }
  })
  // 判断属性被删除的情况
  Object.keys(oldProps).forEach(propName => {
    const newPropsValue = newProps[propName]
    const oldPropsValue = oldProps[propName]
    if (!newPropsValue) {
      // 属性被删除了
      if (propName.slice(0, 2) === "on") {
        const eventName = propName.toLowerCase().slice(2)
        newElement.removeEventListener(eventName, oldPropsValue)
      } else if (propName !== "children") {
        newElement.removeAttribute(propName)
      }
    }
  })
}