# vue-single-page-scaffold

> A Vue.js project scaffold

## Build Setup

``` bash
# 安装依赖
npm install

# 启动开发
npm run start
# or
yarn start

# 打包测试
npm run build:test
# or
yarn build:test

# 打包生产
npm run build
# or
yarn build

# 打包生产并且生成模块依赖分析报告
npm run build --report
```

## 目录结构

``` bash
|-- build // 前端工程化
	|-- build.js              // 生成、测试打包入口文件
	|-- check-versions.js     // 检查 node、npm 版本是否符合规定
	|-- utils.js              // 配置文件工具方法
	|-- vue-loader.conf.js    // vue-loader 配置文件
	|--	webpack.base.conf.js  // webpakck 公共配置
	|--	webpack.dev.conf.js   // webpakck 开发环境配置
	|--	webpack.prod.conf.js  // webpakck 生产环境配置
	|--	webpack.test.conf.js  // webpakck 测试环境配置
|-- config // 前端配置文件
	|-- dev.env.js  // 开发环境 DefinePlugin 配置
	|-- index.js    // 基础环境配置
	|-- prod.env.js // 生产环境 DefinePlugin 配置
	|-- test.env.js // 测试环境 DefinePlugin 配置
|-- dist // 发版时生成
|-- src
	|-- assets
		|-- images      // 图片资源
		|-- plugin      // 插件资源
			|-- axios.js  // http 库配置
			|-- checkResp.js    // 异步请求返回值标准化
			|-- handleError.js  // 异步请求错误处理
			|-- isMobile.js     // 移动端判断
		|-- scripts // js 资源
		|-- style   // 样式资源
	|-- constants // 常量
		|-- enum.js // 后端 enum 
	|-- feConfig  // 开发配置目录
		|-- development.js  // 开发环境配置 
		|-- production.js   // 生产环境配置
		|-- test.js         // 测试环境配置
	|-- filters // 如果需要全局 filter 可自行添加注册，参照 https://cn.vuejs.org/v2/guide/filters.html
	|-- router  // 路由配置
	|-- store   // 状态管理配置
		|-- modules   // vuex module
		|-- type      // Action、Mutation 的变量名
		|-- index.js  // 对外暴露 vuex 实例
	|-- components	// 全局组件
	|-- views // 页面
		|-- example // 例子
		  |-- components  // 局部组件 
	|-- APP.vue // 入口 vue 文件
	|-- main.js // 入口 js 文件
|-- test // 单测
|-- .babelrc // babel 配置文件
|-- .editorconfig // editorconfig 配置文件
|-- .eslintignore // eslint 忽略目录配置文件
|-- .eslintrc.js // eslint 配置文件
|-- .gitignore // git 或略目录配置文件
|-- .postcssrc.js // postcss 配置文件
|-- .stylelintrc // stylelint 配置文件
|-- favicon.ico // 站标
|-- index.html // index 模板文件
|-- package.json //  项目依赖文件
|-- README.md
|-- yarn.lock 
```

## 前端工程化工具

Webpack：/build 目录下均为开发启动，打包构建相关 webpack 配置；

Babel：用来程序使用 ES 新语法后转义；webpack 中包含 babel-loader 配置，babel 自身配置在 .babelrc 下；

Eslint：用来规范化 js、vue 代码；.eslintrc.js、.editorconfig、.eslintignore 均为 eslint 配置文件，另外 webpack 配置文件中有关于 eslint-loader 的配置；

Stylelint：用来规范化 css 代码，其配置文件为 .stylelintrc，另外 webpack 配置文件中有关于 eslint-loader 的配置；

Karma + Mocha + chai：单测方案，单测书写目录 /test;

Node：程序依赖 node 环境， node >= 6.0;

Yarn：新一代包管理器，速度优于 npm;

更多信息请参考：http://wiki.iyunxiao.com/pages/viewpage.action?pageId=150602338
