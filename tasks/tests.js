var babel = require('gulp-babel');
var gulp = require('gulp');
var grun = require('../tools/gulp-run-task');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');
var sourcemaps = require('gulp-sourcemaps');

var compile = function(){
    return gulp.src('./tests/**/*')
        .pipe(sourcemaps.init())
        .pipe(babel({
            optional: ['es7.asyncFunctions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/tests/'));
};

var watch = function(){
    gulp.watch('./tests/**/*.js', function () {
        gutil.log('Test files changed, recompiling...');
        grun('compile:tests');
    });
};

var run = function () {
    gulp.src('./dist/tests/**/*')
        .pipe(mocha());
};

gulp.task('compile:tests', compile);
gulp.task('run:tests', ['compile:tests'], run);
gulp.task('watch:tests', ['compile:tests'], watch);
