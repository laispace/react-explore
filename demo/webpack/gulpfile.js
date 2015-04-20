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
