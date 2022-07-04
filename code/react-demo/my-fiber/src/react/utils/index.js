import { createDOMElement } from './dom'
export const arrified = arg => Array.isArray(arg) ? arg : [arg]

function createReactInstance(fiber) {
  let instance = null

  if (fiber.tag === 'class_component') {
    instance = new fiber.type(fiber.props)
  } else {
    instance = fiber.type
  }

  return instance
}

export const createStateNode = (fiber) => {
  if (fiber.tag === 'host_component') {
    return createDOMElement(fiber)
  }

  return createReactInstance(fiber)
}

export function getTag(vdom) {
  if (typeof vdom.type === 'string') {
    return 'host_component'
  }

  if (vdom.type.isReactComponent) {
    return 'class_component'
  }

  return 'function_component'
}

export const getRootFiber = (instance) => {
  let fiber = instance.__fiber
  while (fiber.return) {
    fiber = fiber.return
  }
  return fiber
}