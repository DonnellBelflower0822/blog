import './assets/styles/index.css'
import './assets/less/index.less'

import lodash from 'lodash'

console.log(111, process.env.API_URL)

// const component = () => {
//     const element = document.createElement('div')
//     element.innerHTML = lodash.join(['hello', 'world'])
//     element.classList.add('h1')

//     return element
// }

const wait = (time = 1000) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('ok')
        }, time)
    })
}

(async () => {
    const result = await wait()
    console.log(11111, result)
})()

const init = () => {
    return import(/*  */'./components/tmpComponent').then(({ default: createElement }) => {
        const innerHTML = lodash.join(['hello', 'world'])
        return createElement(innerHTML)
    })
}

init().then(component => {
    document.body.appendChild(component)
})