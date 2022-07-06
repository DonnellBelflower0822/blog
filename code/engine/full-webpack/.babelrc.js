module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                "useBuiltIns": "entry",
                "corejs": "3.22",
                // 配合tree shake
                modules: false
            }
        ],
        '@babel/preset-typescript',
        '@babel/preset-react'
    ],
}