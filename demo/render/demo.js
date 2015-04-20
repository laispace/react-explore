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
