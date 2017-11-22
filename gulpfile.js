var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require("gulp-jshint");
var imagemin = require('gulp-imagemin');


gulp.task('default', ['watch']);

// compile sass
gulp.task('scss', function() {
    return gulp
        .src('./src/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', function() {
    return gulp.src('./src/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        //only uglify if gulp is ran with '--type production'
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('jshint', function() {
    return gulp.src('./src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter()); // Dump results
})

gulp.task('img', function() {
    return gulp.src('./src/images/*')
        .pipe(imagemin({
            progressive: true,
        }))
        .pipe(gulp.dest('./dist/images'))
})

gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss', ['scss']);
    gulp.watch('./src/js/*.js', ['jshint', 'js']);
});

gulp.task('build', ['scss', 'js', 'img']);