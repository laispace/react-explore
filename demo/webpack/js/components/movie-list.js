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