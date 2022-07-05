import './assets/styles/index.css'
import './assets/less/index.less'

// import a from '/test.json'

import lodash from 'lodash'
import { wait } from './assets/utils'

console.log(111, process.env.API_URL)

const component = () => {
    const element = document.createElement('div')
    element.innerHTML = lodash.join(['hello', 'world'])
    element.classList.add('h1')
    element.addEventListener('click', () => {
        console.log(1)
        import(/* webpackPrefetch: true  */'./components/tmpComponent').then(({ default: createElement }) => {
            const innerHTML = lodash.join(['hello', 'world'])
            // return createElement(innerHTML)
            document.body.appendChild(createElement(innerHTML))
        })
    })

    return element
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

// init().then(component => {
document.body.appendChild(component())
// })