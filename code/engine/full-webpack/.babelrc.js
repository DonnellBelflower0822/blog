module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                "useBuiltIns": "entry",
                "corejs": "3.22",
                targets: {
                    node: "current"
                },
                // 配合tree shake
                modules: false
            }
        ],
        '@babel/preset-typescript',
        [
            '@babel/preset-react',
            {
                "runtime": "automatic"
            }
        ]
    ],
}