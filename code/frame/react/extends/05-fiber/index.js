const A1 = { type: 'div', props: { key: 'A1' } }

const B1 = { type: 'div', props: { key: 'B1' }, return: A1 }
const B2 = { type: 'div', props: { key: 'B2' }, return: A1 }

const C1 = { type: 'div', props: { key: 'C1' }, return: B1 }
const C2 = { type: 'div', props: { key: 'C2' }, return: B1 }

A1.child = B1

B1.slibing = B2

B1.child = C1

C1.slibing = C2

let nextUnitOfWork = null

function workLoop(deadline) {
    while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && nextUnitOfWork) {
        nextUnitOfWork = preformUnitOfWork(nextUnitOfWork)
    }

    if (!nextUnitOfWork) {
        console.log('render ended')
        nextUnitOfWork = null
        return
    }

    requestIdleCallback(workLoop, { timeout: 1000 })
}

// 处理单个执行单元
function preformUnitOfWork(fiber) {
    // 开始
    beginWork(fiber)

    // 1. 有大儿子
    if (fiber.child) {
        return fiber.child
    }

    // 没有儿子, 则表示此fiber结束
    while (fiber) {
        // 当前fiber完成
        completeUnitOfWork(fiber)

        // 2. 有兄弟就返回兄弟
        if (fiber.slibing) {
            return fiber.slibing
        }

        // 3. 返回父亲
        fiber = fiber.return
    }
}

function beginWork(fiber) {
    console.log('开始', fiber.props.key)
}

function completeUnitOfWork(fiber) {
    console.log('完成', fiber.props.key)
}

function start(newNextUnitOfWork) {
    nextUnitOfWork = newNextUnitOfWork
    requestIdleCallback(workLoop, { timeout: 1000 })
}

start(A1)
