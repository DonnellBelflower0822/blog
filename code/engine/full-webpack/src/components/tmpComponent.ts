const createElement = (innerHTML: any) => {
    const element = document.createElement('div')
    element.innerHTML = innerHTML
    element.classList.add('h1')

    return element
}

export default createElement
