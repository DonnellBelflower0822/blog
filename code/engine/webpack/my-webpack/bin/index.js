#! /usr/bin/env node
const path = require('path')
const Compiler = require('./Compiler')

// 获取webpack.config.js
const config = require(path.resolve('webpack.config.js'))

// 编译
const compiler = new Compiler(config)

compiler.hooks.entryOption.call()

// 编译且生成文件
compiler.run()
