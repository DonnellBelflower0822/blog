// 默认导出
export default function b() { }
// 导出单个
export function a() { }

function c() { }
// 导出单个
export {
    c
}

// 将other里面所有导出
export * from './other.js'
// 把other.js的d用e的名字导出
export { d as e } from './other.js'