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
