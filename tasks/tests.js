var babel = require('gulp-babel');
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');

var compile = function(){
    return gulp.src('./src/tests/**/*')
            .pipe(sourcemaps.init())
            .pipe(babel({
                optional: ['es7.asyncFunctions']
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./dist/tests/'));
};

var watch = function(){
    var cb = function(event){
        gutil.log('Test files changed, recompiling....');
        grun('compile:test');
    };

    gulp.watch('./src/test/**/*.jsx', cb);
    gulp.watch('./src/test/**/*.js', cb);
};

gulp.task('compile:test', compile);
gulp.task('watch:test', ['compile:test'], watch);
