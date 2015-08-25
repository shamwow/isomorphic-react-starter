var bourbon = require('node-bourbon');
var gulp = require('gulp');
var sass = require('gulp-sass');
var setup = require('../tools/gulp-custom-setup');
var sourcemaps = require('gulp-sourcemaps');

var compile = function(){
    return gulp.src('./src/sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: bourbon.includePaths
        }).on('error', sass.logError))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest('./dist/client/static/css/'));
};

setup(compile, 'css', 'sass')
