const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MyHtmlPlugin = require('./plugins/my-html-plugin')

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devtool: 'source-map',
    devServer: {
        static: './dist',
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     title: '管理输出',
        //     template: './public/index.html'
        // }),
        new MyHtmlPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    path.resolve(__dirname, 'loader', 'my-style-loader'),
                    path.resolve(__dirname, 'loader', 'my-css-loader'),
                    path.resolve(__dirname, 'loader', 'my-less-loader')
                ]
            }
        ]
    }
}