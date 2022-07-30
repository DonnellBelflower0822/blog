class MyHtmlPlugin {
    apply(compiler) {
        const outputName = compiler.options.output.filename
        compiler.hooks.emit.tap('MyHtmlPlugin', (compilation) => {
            compilation.assets['index.html'] = {
                source() {
                    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="root"></div>
    <script src="./${outputName}"></script>  
</body>
</html>`
}
            }
        })
    }
}

module.exports = MyHtmlPlugin
