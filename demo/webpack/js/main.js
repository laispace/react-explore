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
