'use strict';

var gulp         = require('gulp');
var plumber      = require('gulp-plumber');
var rename       = require('gulp-rename');
var sass         = require('gulp-sass');
var autoPrefixer = require('gulp-autoprefixer');
var cssComb      = require('gulp-csscomb');
var cmq          = require('gulp-merge-media-queries');
var uglify       = require('gulp-uglify');
var concat       = require('gulp-concat');

gulp.task('sass',function(){
    gulp.src([
          'src/scss/**/*.scss',
          '!src/scss/**/_*.scss'
        ])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(autoPrefixer())
        .pipe(cssComb())
        .pipe(cmq({log: true}))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('js',function(){
    gulp.src(['src/js/**/*.js'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('default',function(){
    gulp.watch('src/js/**/*.js',['js']);
    gulp.watch('src/scss/**/*.scss',['sass']);
});
