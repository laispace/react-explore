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