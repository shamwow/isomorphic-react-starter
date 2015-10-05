require('source-map-support').install();

require('./tasks/server');
require('./tasks/client');
require('./tasks/css');
require('./tasks/shared');

var gulp = require('gulp');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');
var nodemon = require('nodemon');

gulp.task('run:tests', ['compile:server', 'compile:shared', 'compile:client', 'compile:css'],
        function(){
    gulp.src('./dist/tests/**/*')
        .pipe(mocha());
});

gulp.task('move:static_assets', function(){
    gulp.src('./static/**/*')
        .pipe(gulp.dest('./dist/client/static/'));
});

gulp.task('start', ['watch:server', 'watch:shared', 'watch:css', 'watch:client'], function(){
    nodemon({
        execMap: { js: 'node' },
        script: './dist/server/index.js',
        watch: ['./dist'],
        ignore: ['./dist/static'],
        env: { ENVIRONMENT: 'testing' }
    });
});
