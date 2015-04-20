// 使用 React.createClass 创建一个组件
var DemoComponent = React.createClass({
    // 使用 getInitialState 的返回值作为数据的默认值
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
