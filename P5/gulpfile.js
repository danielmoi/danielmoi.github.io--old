// Include gulp
var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
minifyCSS = require('gulp-minify-css');




// Gulp script files – minify and rename
gulp.task('scripts', function () {
  gulp.src('js/app.js')
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('js/'));
});

// Gulp style files – minify and rename
gulp.task('styles', function () {
  gulp.src('css/style.css')
    .pipe(minifyCSS())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('css/'));
});


// Watch stuff
gulp.task('watch', function() {
  gulp.watch('js/app.js', ['scripts']);
  gulp.watch('css/style.css', ['styles']);
});

// Run gulp
gulp.task('default', ['scripts', 'styles']);