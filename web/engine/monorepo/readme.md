# monorepo

- 管理项目代码的一种方式
  - 一个仓库管理多个模块包
- 好处
  - 统一的工作流
  - 模块包代码共享
- lerna一个管理多个npm模块的工具

## multirepo/monorepo

### multirepo
- 好处
  - 各个模块管理自由度高
    - 可以自行选择构建工具
    - 依赖管理
    - 单元测试
  - 体积不会很大
- 坏处
  - 仓库分散,分支管理混乱
  - 版本更新繁琐
    - 公共模块发生变化,要对所有的模块进行依赖更新
  - changelog不好梳理,无法自动关联各个模块的变动

### monorepo
- 好处
  - 一个仓库管理多个模块,方便好找
  - 方便版本管理和依赖管理,模块之间引用调试比较方便
  - 方便统一生成CHNAGELOG
- 缺点
  - 统一构建工具
  - 仓库体积变大

## 使用

```
# 初始化
lerna init
# 配置package.json的workspaces
# 创建模块包
lerna create react
# 查看工作空间的信息
yarn workspaces info
# 按照和生成软链
yarn install
# 添加全局依赖
yarn add lodash --ignore-workspace-root-check
yarn add lodash -W
# 添加某个工作空间的依赖
yarn workspace react add dayjs
```


