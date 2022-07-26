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

function start() {
    nextUnitOfWork = A1
    requestIdleCallback(workLoop, { timeout: 1000 })
}

function workLoop(deadline) {
    while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && nextUnitOfWork) {
        nextUnitOfWork = preformUnitOfWork(nextUnitOfWork)
    }

    if (!nextUnitOfWork) {
        console.log('render ended')
        return
    }

    requestIdleCallback(workLoop, { timeout: 1000 })
}

function preformUnitOfWork(fiber) {
    beginWork(fiber)

    // 有大儿子
    if (fiber.child) {
        return fiber.child
    }

    // 没有儿子, 则表示此fiber结束
    while (fiber) {
        // 当前fiber完成
        completeUnitOfWork(fiber)
        // 有兄弟就返回兄弟
        if (fiber.slibing) {
            return fiber.slibing
        }
        // 返回父亲
        fiber = fiber.return
    }
}

function beginWork(fiber) {
    console.log('beginWork', fiber.props.key)
}

function completeUnitOfWork(fiber) {
    console.log('completeUnitOfWork', fiber.props.key)
}

start()