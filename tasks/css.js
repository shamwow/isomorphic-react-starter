var bourbon = require('node-bourbon');
var gulp = require('gulp');
var sass = require('gulp-sass');
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

var watch = function(){
    var cb = function(event){
        gutil.log('CSS files changed, recompiling....');
        grun('compile:css');
    };

    gulp.watch('./src/sass/**/*.scss', cb);
};

gulp.task('compile:css', compile);
gulp.task('watch:css', ['compile:css'], watch);
