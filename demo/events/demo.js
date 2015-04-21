// 使用 React.createClass 创建一个组件
var DemoComponent = React.createClass({
    // 使用 getInitialState 的返回值作为数据的默认值
    getInitialState: function () {
        return {
            loading: true,
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
                self.hideLoading();
            }, 2000);
        });
    },

    hideLoading: function () {
        this.setState({
            loading: false
        });
    },

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
                        <input type="text" ref="name" placeholder="输入你喜欢的电影"/>
                        <input type="text" ref="date" placeholder="上映时间"/>
                        <input type="submit" value="提交"/>
                    </form>
                    <ul>{movies}</ul>
                    {this.state.loading ? <div>大家好我是菊花, 我现在在转</div> : null}
                </div>
            </div>
        )
    }
});

// 将组件插入到网页中指定的位置
React.render(<DemoComponent />, document.getElementById('demo'));
