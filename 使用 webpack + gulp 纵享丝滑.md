## 打造丝滑的构建 使用 ES6  + gulp + webpack

ES6 和 gulp 的话就不多介绍啦。
    
webpack 是一款新生的前端构建工具，兼容 AMD/CMD 等写法，支持 Browser 和 Node 端共享代码，在浏览器端可以像写 Node 一样方便的进行模块化的划分。
    
在这里主要用 webpack 的两个插件：
    
    - 使用 jsx-loader 这个插件支持 jsx 语法解析
    
    - 使用 esx-loader 这个插件支持 es6 语法解析
    
来看下简单目录结构：
    
    - js/main.js 为入口文件，引入了两个组件。
    
        - js/components/movie-list.js 组件为 JSX 语法编写
    
        - js/components/hello.js 组件为 ES6 + JSX 语法编写
        
    - webpack.config.js 指定 jsx-loader 和 es6-loader
    
    - gulpfile.js 在这里配置 webpack 任务，启动文件监听
    
    - index.html 示例页面，引入 webpack 打包后的 js/bundle.js
        
在 js/main.js 中引入两个不同的组件，然后在 webpack.config.js 中指定编译 JSX 和 ES6 的 loader 工具，使用 gulp 监听 js/ 中文件变化，自动编译出的 js/bundle.js 将被 index.html 引用。
    
嗯，再在 webpack 中加入各种你喜欢的 loader，在 gulp 中加上各种 css、js、img 的处理任务，纵享丝滑。