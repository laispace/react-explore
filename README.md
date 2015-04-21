[原文地址](http://www.alloyteam.com/2015/04/react-explore/)

# React 初探

[1.React 简单介绍](1. React 简单介绍.md)

[2.React 简单示例](2. React 简单示例.md)

[3.使用 webpack + gulp 纵享丝滑构建](3. 使用 webpack + gulp 纵享丝滑构建.md)

[4.零碎总结](4. 零碎总结.md)


[代码示例](demo/)


<!-- more -->

## React 简单介绍

### 先说 React 与 React Native

他们是真的亲戚，可不像 Java 和 Javascript 一样。

其实第一次看到 React 的语法我是拒绝的，因为这么丑的写法，你不能让我写我就写。

但当我发现 React Native 横空出世后，它学习一次到处运行的理念非常诱人。React Native 可以写出原生体验的 iOS/Android 应用？那不就多了一门装逼技能？所以我们调研小组试了一下，感觉 "Duang" 一下，很爽很舒服。写 React Native 需要两门基础技能：React 语法 和 iOS 基础知识。

很爽很舒服，索性就研究一下，算是入门。
了解之后发现，React 真是有另一番天地，值得学习。

接下来总结以下我对 React 的理解，分享给大家。

至于 React Native，有机会再好好探究下。

这部分废话太多，喜欢实战的可以直接看代码部分。

> React 是 Facebook 出品的一套颠覆式的前端开发类库。

为什么说它是颠覆式的呢？

### 内存维护虚拟 DOM

对于传统的 DOM 维护，我们的步骤可能是：

    1. 初始化 DOM 结构
    2. 从服务器获取新数据
    3. 使用新数据更新局部 DOM
    4. 绑定各种事件

首先，我们操作 DOM 是最昂贵的开销，对于 需要反复更新 DOM 的网页，无疑是噩梦。其次，对 DOM 局部的更新以及事件绑定加大了维护的难度。

而 React 引入了一个全新的概念：虚拟 DOM。

虚拟 DOM 是躺在内存里的一种特殊的结构，我们可以理解为这是真实 DOM 在内存里的映射。

除了结构上的映射外，这个虚拟的 DOM 还包括了渲染
真实所需要的数据以及事件绑定。

### 全量更新真实 DOM

虚拟 DOM 在创建时，首先是使用 JSX 的语法生成一个真实 DOM 树的映射，其次是从服务器端拉取远程数据，接着注入到这个虚拟 DOM 树中，同时绑定事件。

好了，有了虚拟 DOM、数据、事件，万事俱备。

接下来，调用 render() 方法一次性渲染出真实的 DOM，然后全量插入到网页中。

虚拟 DOM 静静地躺在内存里，等待数据更新。

新数据来临，调用 setState() 方法更新数据到虚拟 DOM 中，然后自动调用 render() 再一次性渲染出真实的 DOM ，然后全量更新到网页中。

    一个虚拟 DOM，对应一个真实 DOM
    一份数据更新，重新生成虚拟 DOM ，全量更新真实 DOM

就这么简单。
除了带来性能上的提升之外，很显然这种写法简化了我们维护 DOM 的成本 -- 我们只需要维护一份数据。

### 只是 View，可配合其他类库使用

可以看到，React 里最重要的概念有虚拟 DOM、单向数据注入（虚拟 DOM 到真实 DOM）。
这里并没有引入太多其他的东西，所以我对 React 的理解是一个类库，而非框架。
如果要使用 MVC、MVVM 等技术的吧，完全可以把 React 当做其中的 V,即 View, 配合其他类库使用。

### 组件化

我虽然是个前端菜鸟，但日观天象也是能嗅到下一代 Web 将是组件化、组件复用共享的时代。

React 编写起来，就是编写一个个的组件。

我对一个 React 组件的理解是：

    - 模板 HTML (JSX 语法格式)
    - 样式 CSS  (还是独立的样式文件)
    - 交互 JS   (与HTML一起，揉和到 JSX 语法中)

以上三者可以打包复用，甚至是无缝接入，我脚得它就可能是未来了。

HTML 与 JS 使用 JSX 语法糅合到一起的方式是见仁见智，恐怕会引起战争。

我刚接触到 JSX 的时候，一开口也是『我*，好丑』。

但慢慢地却发现，这种方式一开始写起来别扭，但用得却很爽。


接下来，我通过编写一个简单的应用来入门 React。

看完如果大呼不过瘾，建议直飞 React 官方看文档，那才是宝藏！

## React 简单示例

示例代码放置在 [demo/](https://github.com/laispace/react-explore/tree/master/demo)目录下，每个文件夹为一个独立的示例。

先看下这个 demo 最终的样子吧：

[demo - 速度与激情](http://laispace.github.io/react-explore/demo/events/index.html)

每个示例的入口文件 index.html 结构大体相同：

```
<!-- React 真实 DOM 将会插入到这里 -->
<div id="demo"></div>

<!-- 引入 React -->
<script src="../../bower_components/react/react.js"></script>
<!-- 引入 JSX 语法格式转换器 -->
<script src="../../bower_components/react/JSXTransformer.js"></script>

<!-- 注意：script 需要注明 type 为 text/jsx 以指定这是一个 JSX 语法格式 -->
<script type="text/jsx" src="demo.js"></script>
</body>
```


### 渲染一个虚拟 DOM 为真实 DOM

使用 render() 方法生成真实 DOM 并插入到网页中。
```
// 使用 React.createClass 创建一个组件
var DemoComponent = React.createClass({
    // 使用 render 方法自动渲染 DOM
    render: function () {
        return (
            <div className="component-hello">
                <h1 className="hello-title">Hello React</h1>
                <p  className="hello-desc">React 初探</p>
                <div className="hello-movies">
                    <p2>我喜欢的电影</p2>
                    <ul>
                        <li className="movie-item">
                            <span className="movie-name">速度与激情7</span>
                            -
                            <span className="movie-date">2015</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
});

// 将组件插入到网页中指定的位置
React.render(<DemoComponent />, document.getElementById('demo'));
```

[在线演示 demo/render](http://laispace.github.io/react-explore/demo/render/)

[示例代码 demo/render](https://github.com/laispace/react-explore/tree/master/demo/render/)

### 设置初始数据

第一次渲染真实 DOM 时将使用 getInitialState() 返回的数据。
```
// 使用 React.createClass 创建一个组件
var DemoComponent = React.createClass({
    // getInitialState 中返回的值将会作为数据的默认值
    getInitialState: function () {
        return {
            title: '我喜欢的电影',
            movies: [
                {
                    id: 7,
                    name: '速度与激情7',
                    date: 2015
                },
                {
                    id: 6,
                    name: '速度与激情6',
                    date: 2013
                }
            ]
        }
    },
    // 使用 render 方法自动渲染 DOM
    render: function () {
        // this.state 用于存储数据
        var title  = this.state.title;
        var movies = this.state.movies.map(function (movie) {
            return (
                <li className="movie-item" key={movie.id}>
                    <span className="movie-name">{movie.name}</span>
                    -
                    <span className="movie-date">{movie.date}</span>
                </li>
            )
        });

        return (
            <div className="component-hello">
                <h1 className="hello-title">Hello React</h1>
                <p  className="hello-desc">React 初探</p>

                <div className="hello-movies">
                    <p2>{title}</p2>
                    <ul>{movies}</ul>
                </div>
            </div>
        )
    }
});

// 将组件插入到网页中指定的位置
React.render(<DemoComponent />, document.getElementById('demo'));

```

[在线演示 demo/get-initial-state](http://laispace.github.io/react-explore/demo/get-initial-state/)

[示例代码 demo/get-initial-state](https://github.com/laispace/react-explore/tree/master/demo/get-initial-state/)

### 动态更新数据

第二次更新渲染真实 DOM 时将使用 setState() 设置的数据。
```
// 使用 componentDidMount 在组件初始化后执行一些操作
    componentDidMount: function () {
        // 拉取远程数据
        // 开启假数据服务器：
        // cd fake-server && npm install && node index.js
        this.fetchData();
    },

    // 使用自定义的 fetchData 方法从远程服务器获取数据
    fetchData: function () {
        var self = this;
        // 发起 ajax 获取到数据后调用 setState 方法更新组件的数据
        var url = '../../fake-data/movies.json';
        $.getJSON(url, function (movies) {
            // 本地模拟返回太快了，模拟一下网络延迟
            setTimeout(function() {
                self.setState({
                    movies: movies
                });
            }, 2000);
        });
    },
```

[在线演示 demo/set-state](http://laispace.github.io/react-explore/demo/set-state/)

[示例代码 demo/set-state](https://github.com/laispace/react-explore/tree/master/demo/set-state/)

### 绑定事件

绑定事件时，我们可以使用 ref="name" 属性对一个 DOM 节点进行标记，同时可以通过 React.findDOMNode(this.refs.name) 获取到这个节点的原生 DOM。

```
// 使用 render 方法自动渲染 DOM
    render: function () {
        var self = this;
        // this.state 用于存储数据
        var title  = this.state.title;
        var movies = this.state.movies.map(function (movie) {
            return (
                <li className="movie-item" key={movie.id}>
                    <span className="movie-name">{movie.name}</span>
                    -
                    <span className="movie-date">{movie.date}</span>
                    <a href="#" onClick={self.onRemove.bind(null, movie)}>删除</a>
                </li>
            )
        }.bind(this));// 注意这里 bind(this) 修正了上下文

        return (
            <div className="component-hello">
                <h1 className="hello-title">Hello React</h1>
                <p  className="hello-desc">React 初探</p>

                <div className="hello-movies">
                    <p2>{title}</p2>
                    <form onSubmit={this.onAdd}>
                        {/* 注意这里指定 ref 属性，然后我们就可以使用 this.refs.xxx 访问到 */}
                        <input type="text" ref="name" placehlder="输入你喜欢的电影"/>
                        <input type="text" ref="date" placeholder="上映时间"/>
                        <input type="submit" value="提交"/>
                    </form>
                    <ul>{movies}</ul>
                    {this.state.loading ? <div>大家好我是菊花, 我现在在转</div> : null}
                </div>
            </div>
        )
    }
```

```
onRemove: function (movie) {
        var id = movie.id;
        console.log(movie)
        // 删除这个 item
        var movies = this.state.movies;
        var len = movies.length;
        var index = -1;
        for(var i = 0; i < len; i++) {
            var _movie = movies[i];
            if (_movie.id === id) {
                index = i;
                break;
            }
        }
        if (index > 0) {
            movies.splice(index, 1);
            this.setState({
                movies: movies
            });
        }
    },

    onAdd: function (e) {
        e.preventDefault();
        var refs = this.refs;
        var refName = React.findDOMNode(refs.name);
        var refDate = React.findDOMNode(refs.date);
        if (refName.value === '') {
            alert('请输入电影名');
            return;
        } else if (refDate === '') {
            alert('请输入上映时间');
            return;
        }
        var movie = {
            // 使用 findDOMNode 获取到原生的 DOM 对象
            name: refName.value,
            date: refDate.value,
            id: Date.now() // 粗暴地以时间数字作为随机 id
        };

        var movies = this.state.movies;
        movies.push(movie);
        this.setState(movies);

        refName.value = '';
        refDate.value = '';
    },
```

[在线演示 demo/events](http://laispace.github.io/react-explore/demo/events/)

[示例代码 demo/events](https://github.com/laispace/react-explore/tree/master/demo/events/)

### 多组件与组件嵌套

一个组件就包含了 JSX 模板、数据维护、事件绑定的话，代码量已经够多了，这时候可以采用 AMD/CMD 的方式，将组件进行更细粒度的划分，可以以文件即组件的方式来编写，这里就不上 demo 了。

### 组件间通信

在 React 中，数据流是单向的，且组件之间可以嵌套，我们可以通过对最顶层组件传递属性方式，向下层组件传送数据。

- 嵌套组件间，使用 this.props  属性向下传递数据

- 独立组件之间，自行维护数据则需要自行维护一个全局数据存储，或者使用发布订阅地方式通知数据的更新。

全局数据存储怎么做呢？可以理解为不同的组件获取的数据源一致，在组件的外部维护这个数据集合，或者干脆直接从服务器端获取。

有人会说了，这样很不方便。

但我觉得，既然是一个组件，那就配套有获取组件所需数据的方式，独立组件间有很强的数据依赖时，要么使用上述方式，要么可以简单粗暴，将独立组件用一个顶层组件包裹起来，转化为嵌套组件的关系，即可数据互通。
```
// 将子组件抽离出来
var LiWrapper = React.createClass({
    render: function () {
        // 使用 this.props 获得传入组件的数据
        var movie = this.props.movie;
        return (
            <li>{/* ... */}</li>
        )
    }
});

// 使用 React.createClass 创建一个组件
var DemoComponent = React.createClass({
    // 使用 getInitialState 的返回值作为数据的默认值
    getInitialState: function () {
      // ...
    },

    // 使用 render 方法自动渲染 DOM
    render: function () {
        // this.state 用于存储数据
        var movies = this.state.movies.map(function (movie) {
            return (
               <LiWrapper movie={movie}/>
            )
        }.bind(this));// 注意这里 bind(this) 修正了上下文

        return (
            <div className="component-hello">
                {/* ... */}
                <div className="hello-movies">
                    <ul>{movies}</ul>
                </div>
            </div>
        )
    }
});

// 将组件插入到网页中指定的位置
// 在使用组件时传入 movies 数据
var movies = [// ...];
React.render(<DemoComponent movies={movies}/>, document.getElementById('demo'));
```

[在线演示 demo/comunications](http://laispace.github.io/react-explore/demo/comunications/index1.html)

[示例代码 demo/comunications](https://github.com/laispace/react-explore/tree/master/demo/comunications/)

## 打造丝滑的构建 使用 ES6  + gulp + webpack

ES6 和 gulp 的话就不多介绍啦。

webpack 是一款新生的前端构建工具，兼容 AMD/CMD 等写法，支持 Browser 和 Node 端共享代码，在浏览器端可以像写 Node 一样方便的进行模块化的划分。

在这里主要用 webpack 的两个插件：

- 使用 jsx-loader 这个插件支持 jsx 语法解析

- 使用 esx-loader 这个插件支持 es6 语法解析

来看下简单目录结构：

- js/main.js 为入口文件，引入了两个组件。

```
var React = require('react');

var MovieListComponent = require('./components/movie-list');
var HelloMessageComponent = require('./components/hello');

var movies = [
    {
        id: 5,
        name: '速度与激情5',
        date: 2011
    },
    {
        id: 4,
        name: '速度与激情4',
        date: 2009
    }
];

var wording = '保罗';

var MainComponent = React.createClass({
    render: function () {
        return (
            <div className="component-hello">
                <HelloMessageComponent name={wording}/>
                <MovieListComponent movies={movies} />
            </div>
        )
    }
});

React.render(<MainComponent />, document.getElementById('demo'));

```
- js/components/movie-list.js 组件为 JSX 语法编写

```
var React = require('react');

// 引入子组件
var MovieComponent = require('./movie');

// 使用 React.createClass 创建一个组件
var MovieListComponent = React.createClass({
    // 使用 getInitialState 的返回值作为数据的默认值
    getInitialState: function () {
        return {
            loading: true,
            title: '我喜欢的电影',
            // 注意这里将 外部传入的数据赋值给了 this.state
            movies: []
        }
    },

    // 使用 render 方法自动渲染 DOM
    render: function () {
        // this.state 用于存储数据
        var title  = this.state.title;
        // this.props 用于从组件外部传入数据
        var movies = this.props.movies;
        movies = movies.map(function (movie) {
            return (
                <MovieComponent movie={movie}/>
            )
        }.bind(this));// 注意这里 bind(this) 修正了上下文

        return (
            <ul>{movies}</ul>
        )
    }
});

module.exports = MovieListComponent;
```
- js/components/hello.js 组件为 ES6 + JSX 语法编写

```
var React = require('react');

class HelloComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {wording: '你好呀, '};
    }
    render() {
        return <div>{this.state.wording} {this.props.name}</div>;
    }
}

module.exports = HelloComponent;

```
- webpack.config.js 指定 jsx-loader 和 es6-loader

```
module.exports = {
    entry: ['./js/main.js'],
    output: {
        path: __dirname,
        filename: 'js/bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'es6-loader' },
            { test: /\.js$/, loader: 'jsx-loader' }
        ]
    }
};
```

- gulpfile.js 在这里配置 webpack 任务，启动文件监听

```
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var webpack = require("gulp-webpack");

var webpackConfig = require('./webpack.config');

gulp.task("webpack", function() {
    return gulp.src('./js/main.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['js/**/*.js', '!js/bundle.js'], ['webpack']);
});

gulp.task('default', [
    'webpack',
    'watch'
]);
```

- index.html 示例页面，引入 webpack 打包后的 js/bundle.js
```
<!-- React 真实 DOM 将会插入到这里 -->
<div id="demo"></div>
<script src="./js/bundle.js"></script>
```

在 js/main.js 中引入两个不同的组件，然后在 webpack.config.js 中指定编译 JSX 和 ES6 的 loader 工具，使用 gulp 监听 js/ 中文件变化，自动编译出的 js/bundle.js 将被 index.html 引用。

嗯，再在 webpack 中加入各种你喜欢的 loader，在 gulp 中加上各种 css、js、img 的处理任务，编写代码，自动重新编译，纵享丝滑。

[示例代码](https://github.com/laispace/react-explore/tree/master/demo/webpack/)

## 零碎总结

文章到这里应该就算结束了，接下来是一些在学习过程中记下来的几个小点，也分享给大家。

### 简单理解 JSX 语法

JSX 把 JS 和 HTML 糅合起来了，这么理解是不是感觉比较简单：

> 遇到 {} 包裹的是 JS，遇到 <> 包裹的是 HTML

### render() 中 返回的的 JSX 模板需要一个根元素包裹起来

比如：
```
// 错误的写法
var MyComponent = React.createClass({
    render: function () {
        return (
            <h1>速度与激情7</h1>
            <p>致敬保罗</p>
        )
    }
});
```
应该写成：
```
// 正确的写法
var MyComponent = React.createClass({
    render: function () {
        return (
            <div>
                <h1>速度与激情7</h1>
                <p>致敬保罗</p>
            </div>
        )
    }
});
```

### 几个重要方法

- render() 返回的是一系列嵌套的组件
this.props 获取父组件传递给子组件的数据
this.setState({data: data}); 用于动态更新状态，设置数据（设置后UI会自动刷新）
- getInitialState() 在整个组件的生命周期中只会执行一次，用于初始化数据
- componentDidMount 会在 render 后自动调用，用于异步获取数据，更新数据

### 操作数据的流程
1. gitInitialState() 初始化数据
2. render() 渲染初始化数据
3. componentDidMount() 异步获取数据
4. setState() 更新数据


### 理解一个组件的状态转换
每一个组件都可以理解为有一个简单的状态机。

调用 setState(data, callback) 后，data 将会混入 this.state 中，数据得到了更新，render() 就会被调用，UI 就能被更新。



### 组件之间如何通信
```
<Parent><Child /></Parent>
```
父组件可以获取到子组件：this.props.children

### render() 永远不要手动调用

render() 在 React 创建时会调用一次，在数据更新时调用 setState() 方法则会继续调用它来更新网页中的真实 DOM。

### 使用 getInitialState() 设置默认值

这个方法返回的值会在组件初始化第一次调用 render() 时就被使用

### class 是关键字，改用 className

```
// 错误的写法
var MyComponent = React.createClass({
    render: function () {
        return (
            <div class="movie">
                <h1>速度与激情7</h1>
                <p>致敬保罗</p>
            </div>
        )
    }
});
```
应该写成：
```
// 正确的写法
var MyComponent = React.createClass({
    render: function () {
        return (
            <div className="movie">
                <h1>速度与激情7</h1>
                <p>致敬保罗</p>
            </div>
        )
    }
});
```

### 组件名大写，不然不被识别

```
// 错误的写法
var myComponent = React.createClass({
    render: function () {
        return (
            <div class="movie">
                <h1>速度与激情7</h1>
                <p>致敬保罗</p>
            </div>
        )
    }
});

React.render(<myComponent />, document.getElementById('demo'));

```
应该写成：
```
// 正确的写法
var MyComponent = React.createClass({
    render: function () {
        return (
            <div className="movie">
                <h1>速度与激情7</h1>
                <p>致敬保罗</p>
            </div>
        )
    }
});

React.render(<MyComponent />, document.getElementById('demo'));
```

### 怎么隐藏或显示菊花
```
var MyComponent = React.createClass({
    getInitialState: function () {
        return {loading: true}
    },
    showLoading: function () {
        this.setState({loading: true})
    },
    hideLoading: function () {
        this.setState({loading: false})
    },
    render: function () {
        return (
            {
                this.state.loading ?
                <div>大家好我是菊花，我在转</div>
                :
                null
            }
        )
    }
});
```

### 插入原生的 HTML 片段的方式

React 会为我们过滤 XSS，要让一段 HTML 片段直接显示出来，需要这样：

```
<div dangerouslySetInnerHTML={{__html: 'First &middot; Second'}} />
```

### 让 React 支持移动触摸实践
```
React.initializeTouchEvents(true);
```

### 处理表单
表单因为会因用户交互而变化，所以有特定的一些属性

- input 和 textarea 组件具有 value
- input[type=checkbox] 和 input[type=radio] 具有 checked
- option 具有 selected，如果要支持多选，可以传入数组：
```
<select multiple={true} value={['B', 'C']}>
```
表单项具有 onChange 事件

注意如果这么写：
```
render: function() {
    return <input type="text" value="Hello!" />;
  }
```
那每次 render 的时候 input 的 value 都会被重置为 "Hello!"，所以需要这么控制：
```
getInitialState: function() {
    return {value: 'Hello!'};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function() {
    var value = this.state.value;
    return <input type="text" value={value} onChange={this.handleChange} />;
  }
```
利用这点，可以无缝地接入一些验证规则，比如限制文字为 140 字：
```
handleChange: function(event) {
   this.setState({value: event.target.value.substr(0, 140)});
 }
```
如果不想这么被控制呢？那就在返回 input 的时候，不要设置 value 属性，这样随着用户输入，value 不会被重置：
```
 render: function() {
    return <input type="text" />;
  }
 ```
也可以设置默认值：
```
render: function() {
    return <input type="text" defaultValue="Hello!" />;
  }
```
除了 `defaultValue` 之外，还支持 `defaultChecked`

### 理解虚拟 DOM
React 会在内存里维护一个代表 DOM  的结构，调用
render 方法时才生成真正的 DOM 插入到网页中。


### 理解组件的生命周期

一个组件的声明周期可以理解为三个阶段：

1. mounting     组件正在插入到 DOM 中
2. updating     组件正在重新注入新数据后更新到 DOM 中
3. unmounting 组件从 DOM 中移除


#### mounting 阶段

- getInitialState() 被调用，返回原始数据

- componentWillMount() 在组件 mounting 前调用

- componentDidMount() 在组件 mounting 完成后调用

#### updating 阶段

- componentWillReceiveProps(nextProps) 在接收到新的 props 时调用
- shouldComponentUpdate(nextProps, nextState) 在组件需要更新 DOM 时调用，若这个函数返回 false 则告诉 React 不要更新
- componentWillUpdate(nextProps, nextState) 在更新发生时调用，可以在这里调用 this.steState() 刷新数据
- componentDidUpdate(prevProps, prevState) 在更新完成后调用

#### unmounting 阶段
- componentWillUnmount() 在组件移除时被调用，在这里可以对数据进行清理

### 强制使用数据更新组件
forceUpdate() 强制使用数据更新组件，而不用调用 this.setState()

### 获取原生 DOM 元素
`React.findDOMNode(component)` 返回原生的 DOM 元素
注意要获取原生的 DOM 元素，必须在 render 被调用， 真正的 DOM 已经被插入到页面中时。


### 理解 refs

可以把 refs 理解为我们在 HTML 中的id，用于定位到指定的组件。
```
<form onSubmit={this.onAdd}>
    {/* 注意这里指定 ref 属性，然后我们就可以使用 this.refs.xxx 访问到 */}
    <input type="text" ref="name" placehlder="输入你喜欢的电影"/>
    <input type="text" ref="date" placeholder="上映时间"/>
    <input type="submit" value="提交"/>
</form>
```

ref 属性可以是一个回调函数而不是名字，这个回调会在组件 mounted 后被调用。回调函数使用被引用的组件作为参数。
```
<input ref={ function(component){ React.findDOMNode(component).focus();} } />
```
注意不要在 render 方法中访问  refs 属性。

[原文地址](http://www.alloyteam.com/2015/04/react-explore/)







