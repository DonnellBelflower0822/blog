const path = require('path')
const fs = require('fs')
const { SyncHook } = require('./hook')
const { parser } = require('./parser')
const generateTemplate = require('./template')
const { getFileContent } = require('./utils')

class Compiler {
    constructor (config) {
        // 初始化
        this.config = config
        // 所有的模块
        this.modules = {}
        // 入口文件
        this.entry = config.entry
        // 入口文件路径
        this.entryId = null
        // 项目路径
        this.root = process.cwd()

        // 注册钩子
        this.hooks = {
            entryOption: new SyncHook(),
            compile: new SyncHook(),
            afterCompile: new SyncHook(),
            afterPlugins: new SyncHook(),
            run: new SyncHook(),
            emit: new SyncHook(),
            done: new SyncHook(),
        }

        // 执行插件
        const { plugins } = config
        plugins?.forEach(plugin => {
            plugin.apply(this)
        })

        this.hooks.afterPlugins.call()
    }

    // 使用loader转换内容
    loaderSource(modulePath, source) {
        const { rules = [] } = this.config.modules ?? {}
        const rule = rules.find(_rule => _rule.test.test(modulePath))

        if (!rule) {
            return source
        }

        const { use = [] } = rule
        return use.reduceRight((prevResult, loaderPath) => {
            const loader = require(loaderPath)
            return loader(prevResult)
        }, source)
    }

    // 构建模块
    buildModule(modulePath, isEntry) {
        // 获取文件内容 
        let source = getFileContent(modulePath, this.root)
        // 使用loader进行转换
        source = this.loaderSource(modulePath, source)

        const moduleName = './' + path.relative(this.root, modulePath)

        // 返回 处理require的代码文件内容 和 依赖项
        const { sourceCode, dependencises } = parser(source, path.dirname(moduleName))

        // 记录入口和模块
        if (isEntry) {
            this.entryId = modulePath
        }
        this.modules[moduleName] = sourceCode

        // 递归构建依赖
        dependencises.forEach(dependencise => {
            this.buildModule(
                path.resolve(this.root, dependencise)
            )
        })
    }

    // 生成文件
    emitFile() {
        const { path: outputBasePath, filename } = this.config.output
        const outputPath = path.join(outputBasePath, filename)

        // 生成文件
        const code = generateTemplate(
            this.entryId,
            this.modules
        )

        this.assets = {}
        this.assets[outputPath] = code
        this.hooks.emit.call()

        // 写入文件
        Object.keys(this.assets).forEach(url => {
            fs.writeFileSync(url, this.assets[url])
        })
    }

    // 启动编译
    run() {
        this.hooks.run.call()
        this.hooks.compile.call()

        // 从入口文件构建模块
        this.buildModule(this.entry, true)

        this.hooks.afterCompile.call()

        // 生成文件
        this.emitFile()
        this.hooks.done.call()
    }
}

module.exports = Compiler
