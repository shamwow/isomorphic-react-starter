var babel = require('gulp-babel');
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');

var compile = function(){
    return gulp.src('./src/shared/**/*')
            .pipe(sourcemaps.init())
            .pipe(babel({
                optional: ['es7.asyncFunctions']
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./dist/shared/'));
};

var watch = function(){
    var cb = function(event){
        gutil.log('Shared files changed, recompiling....');
        grun('compile:shared');
    };

    gulp.watch('./src/shared/**/*.jsx', cb);
    gulp.watch('./src/shared/**/*.js', cb);
};

gulp.task('compile:shared', compile);
gulp.task('watch:shared', ['compile:shared'], watch);
