const less = require('less')

module.exports = function (source) {
    less.render(source, (e, output) => {
        // html,\n' +
        // 'body {\n' +
        // '  margin: 0;\n' +
        // '}\n' +
        // 'html #root,\n' +
        // 'body #root {\n' +
        // '  width: 100%;\n' +
        // '  height: 100%;\n' +
        // '}\n'
        this.callback(e, output.css)
    })
    return ''
}