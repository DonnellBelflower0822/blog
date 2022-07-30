# 脚手架 pd-cli

> 仓库地址: https://github.com/all-2-one/pd-cli

## 脚手架

- 快速的搭建项目的基本结构并提供项目规范和约定

## 流程
- 脚手架就是在启动的时候询问一些简单的问题，并且通过用户回答的结果去生成对应的模板文件

## 包
- commander	命令行自定义指令
- inquirer	命令行询问用户问题，记录回答结果
- chalk	控制台输出内容样式美化
- ora	控制台 loading 样式
- download-git-repo	下载远程模版

## 开发调试

```shell
cd pd-cli
# 方便本地调试
# 链接到全局
npm link

# 开发
npm run dev

# 打包
npm run build
```

## 模板地址
- https://github.com/all-2-one

### 接口地址
- 模板地址: https://api.github.com/orgs/[all-2-one]/repos
- 模板的版本: https://api.github.com/repos/[all-2-one]/[react-template]/tags

## 安装脚手架
```
npm install xz-pd-cli -g
yarn add xz-pd-cli -g
```

## 命令行
```
pd create <project name>
```

## 自定义rollup插件

> 在生成文件前 加上 #! /usr/bin/env node

- #! 符号的名称叫 Shebang，用于指定脚本的解释程序
- Node CLI 应用入口文件必须要有这样的文件头
- 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
- 具体就是通过 chmod 755 cli.js 实现修改

```js
export default function myBanner() {
    return {
        name: 'my-banner',
        generateBundle(_, info) {
            if (info['index.js']) {
                info['index.js'].code = `#! /usr/bin/env node \n${info['index.js'].code}`
            }
        }
    }
}
```
