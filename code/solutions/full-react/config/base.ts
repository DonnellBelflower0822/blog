import * as path from 'path'
import * as webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import MiniCssExtractPlugin from "mini-css-extract-plugin"

const baseConfig: webpack.Configuration = {
    entry: {
        index: './src/main.ts',
        login: './src/login.ts'
    },
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        // 如果文件内容不改, 生成文件名不变
        filename: '[name].[contenthash].js',
        clean: true
    },
    devServer: {
        static: './dist',
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                // 从右往左一次调用
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    // path.resolve(__dirname, './loader/style-loader/index.js'),
                    'css-loader'
                ]
            },
            {
                test: /\.less$/i,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    "useBuiltIns": "entry",
                                    "corejs": "3.22"
                                }
                            ],
                            '@babel/preset-typescript',
                            '@babel/preset-react'
                        ]
                    }
                }
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        "useBuiltIns": "entry",
                                        "corejs": "3.22"
                                    }
                                ],
                                '@babel/preset-typescript',
                                '@babel/preset-react'
                            ]
                        }
                    },
                    'ts-loader'
                ],
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, '..', 'src')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            chunks: ['index']
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'public/**/*',
                    to: "[name][ext]",
                    globOptions: {
                        ignore: ['**/index.html']
                    }
                }
            ]
        }),
        new MiniCssExtractPlugin()
    ],
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    }
}

export default baseConfig