var assign = require('object-assign');
var gulp = require('gulp');
var path = require('path');
var webpack = require('../tools/gulp-webpack.js');

var webpackConfig = {
    context: path.resolve(__dirname, '..'),
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, '../src/'),
                loader: 'babel-loader?optional[]=runtime&optional[]=es7.asyncFunctions'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    node: {
        __filename: true,
        __dirname: true
    },
    devtool: 'eval-source-map',
    progress: true
};

var compile = function(){
    return gulp.src('./src/client/init.jsx')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(path.resolve(__dirname, '../dist/client/static/js/')));
};

var watch = function(done){
    var onCompile = function(){
        if (global.__firstClientCompile){
            return;
        }
        global.__firstClientCompile = true;
        done();
    };

    gulp.src('./src/client/init.jsx')
        .pipe(webpack(assign({watch: true, onCompile: onCompile}, webpackConfig)))
        .pipe(gulp.dest(path.resolve(__dirname, '../dist/client/static/js/')));
};

gulp.task('compile:client', compile);
gulp.task('watch:client', watch);
