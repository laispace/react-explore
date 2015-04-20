var React = require('react');

var MovieComponent = React.createClass({
    render: function () {
        // 使用 this.props 获得传入组件的数据
        var movie = this.props.movie;
        return (
            <li className="movie-item" key={movie.id}>
                <span className="movie-name">{movie.name}</span>
                -
                <span className="movie-date">{movie.date}</span>
            </li>
        )
    }
});

module.exports = MovieComponent;