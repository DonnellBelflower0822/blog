const path = require('path')
const fs = require('fs')

const getFileContent = (modulePath, root) => {
    return fs.readFileSync(
        path.resolve(root, modulePath),
        { encoding: 'utf-8' }
    )
}

exports.getFileContent = getFileContent