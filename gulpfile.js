var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');

gulp.task('browserSync', function(){
   browserSync.init({
      server: {
         baseDir: 'public/'
      },
   });
});

gulp.task('less', function(){
   return gulp.src('source/**/*.less')
   .pipe(less())
   .pipe(gulp.dest('public/'));
});

gulp.task('useref', function(){
   return gulp.src('source/*.html')
   .pipe(useref())
   .pipe(gulpIf('*.css', cssnano()))
   .pipe(gulp.dest('public'))
   .pipe(gulpIf('*.js', uglify()))
   .pipe(gulp.dest('public'));
});

gulp.task('imagemin', function(){
   return gulp.src('source/img/*')
   .pipe(imagemin())
   .pipe(gulp.dest('public/img/'));
});

gulp.task('watch', ['browserSync'], function(){
   gulp.watch('source/*.html', ['useref']);
   gulp.watch('source/**/*.less', ['less']);
   gulp.watch('public/style/**/*.css', ['useref']);
   gulp.watch('public/**/app.min.css', browserSync.reload);
});
