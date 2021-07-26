export { default as createTaskQueue } from './createTaskQueue'

export const arrified = arr => Array.isArray(arr) ? arr : [arr]

function createDOMElement(fiber) {
  if (fiber.type === 'text') {
    return document.createTextNode(fiber.props.textContent)
  }

  const element = document.createElement(fiber.type)
  // 处理属性
  return element
}

export function createStateNode(fiber) {
  if (fiber.tag === "host_component") {
    return createDOMElement(fiber)
  }
}

export function getTag(vdom) {
  if (typeof vdom.type === 'string') {
    return 'host_component'
  }
}