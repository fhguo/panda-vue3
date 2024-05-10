#                    Panda后台管理系统

## 前言

Panda后台管理系统（BXRMS）前端采用`Vue3`版本+组合式API的流行写法，同时使用了前端下一代构建化工具`Vite`、对类型限制更为严格的`TypeScript`、路由的新版本`vue-router4`、新一代状态仓库管理工具`Pinia`、UI组件库`Element-plus`、前后端交互工具`Axios`以及可视化大屏工具`ECharts`。

## 项目截图

> 登录页

![登录页](./img/login.png)

> 登录页-暗黑模式

![登录页-暗黑](./img/login-dark.png)

> 首页

![首页](./img/home.png)

## 项目准备

一个项目要有统一的规范，需要使用`eslint`来对我们的代码质量做检测和修复，需要使用`husky`来做commit拦截，需要使用`commitlint`来统一提交规范，需要使用`preinstall`来统一包管理工具。

下面我们就用这一套规范来初始化我们的项目，集成一个规范的模版。

### 1. 环境准备

- node 16 +
- pnpm 8.0.0 +

### 2. clone项目

本项目使用vite进行构建，vite官方中文文档参考：[cn.vitejs.dev/guide/](https://cn.vitejs.dev/guide/)

项目包管理工具使用**pnpm**（performant npm ），[pnpm](https://pnpm.io/zh/installation)是“高性能的 npm”，由npm/yarn衍生而来，极大的优化了性能。

**注意：项目所有的包必须使用pnpm安装，否则会安装失败！！！**

- pnpm安装指令

```
npm i -g pnpm
```

- 进入到项目根目录安装全部依赖

```
pnpm install
```

- 安装完依赖运行程序

```
pnpm run dev
```

- Eslint格式验证

```
pnpm run lint
```

- 代码格式修正

```
pnpm run fix
```

### 3. 项目提交规范

- 当commit 提交信息之前必须执行`pnpm run fix`修正格式，否则会导致不符合格式要求的代码无法提交。

- 提交信息必须是 `git commit -m 'fix: xxx' `这样的格式。

  需要注意的是类型的后面需要用英文的 :，并且冒号后面是需要空一格的

```js
'feat',//新特性、新功能
'fix',//修改bug
'docs',//文档修改
'style',//代码格式修改, 注意不是 css 修改
'refactor',//代码重构
'perf',//优化相关，比如提升性能、体验
'test',//测试用例修改
'chore',//其他修改, 比如改变构建流程、或者增加依赖库、工具等
'revert',//回滚到上一个版本
'build',//编译相关的修改，例如发布版本、对项目构建或者依赖的改动
```