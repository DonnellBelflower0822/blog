export default class Collapse extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    const tmpl = document.getElementById('zf-collapse_tmpl')
    const cloneTemplate = tmpl.content.cloneNode(true)
  }
}