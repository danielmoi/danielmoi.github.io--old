// Include gulp
var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
minifyCSS = require('gulp-minify-css');


// Gulp html files
gulp.task('html', function() {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

// Gulp image files
gulp.task('images', function() {
  gulp.src('src/img/')
    .pipe(gulp.dest('dist/img'));
});

// Gulp script files – minify and rename
gulp.task('scripts', function () {
  gulp.src('src/js/app.js')
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('dist/js/'));
  gulp.src('src/js/lib/*')
    .pipe(gulp.dest('dist/js/lib'));
});

// Gulp style files – minify and rename
gulp.task('styles', function () {
  gulp.src('src/css/style.css')
    .pipe(minifyCSS())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('dist/css/'));
  gulp.src('src/css/lib/*')
    .pipe(gulp.dest('dist/css/lib'));  
});


// Watch stuff
gulp.task('watch', function() {
  gulp.watch('src/js/app.js', ['scripts']);
  gulp.watch('src/css/style.css', ['styles']);
});

// Run gulp
gulp.task('default', ['html', 'scripts', 'styles', 'images']);