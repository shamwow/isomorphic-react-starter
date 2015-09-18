var grun = require('./gulp-run-task');
var gulp = require('gulp');
var gutil = require('gulp-util');

module.exports = (function(){
    var capitalize = function(string) {
        return string[0].toUpperCase() + string.substring(1);
    }

    return function(compile, name, destFolder){
        var watch = function(){
            var cb = function(event){
                gutil.log(capitalize(name) + ' files changed, recompiling....');
                grun('compile:' + name);
            };

            gulp.watch('./src/' + (destFolder || name) + '/**/*.jsx', cb);
            gulp.watch('./src/' + (destFolder || name) + '/**/*.js', cb);
        };

        gulp.task('compile:' + name, compile);
        gulp.task('watch:' + name, ['compile:' + name], watch);
    };
})();
