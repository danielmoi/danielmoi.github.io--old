// Include gulp
var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  cssnano = require('gulp-cssnano'),
  del = require('del'),
  notify = require('gulp-notify');

// Clean up first!
gulp.task('clean', function () {
  // this uses a Node module directly within gulp (no need for gulp plugin)
  return del(['dist']);
});

// Gulp html files
gulp.task('html', function () {
  return gulp.src('src/index.html') // add return so it's asynchronous
    .pipe(gulp.dest('dist'))
    .pipe(notify({
      message: 'html task complete'
    }));
});

// Gulp image files
gulp.task('images', function () {
  return gulp.src('src/img/**/*.*')
    .pipe(gulp.dest('dist/img'))
    .pipe(notify({
      message: 'images task complete'
    }));
});


// Gulp script files – minify and rename
gulp.task('scripts', function () {
  gulp.src('src/js/lib/**/*.js')
    .pipe(gulp.dest('dist/js/lib'));
  return gulp.src(['src/js/**/*.js', '!src/js/**/*.min.js', '!src/js/lib']) // need to add "**/" to make this recursive
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('src/js')) // trailing "/" not needed
    .pipe(gulp.dest('dist/js')) // trailing "/" not needed
    .pipe(notify({
      message: 'scripts task complete'
    }));
});

// Gulp style files – minify and rename
gulp.task('styles', function () {
  gulp.src('src/css/lib/**/*.js')
    .pipe(gulp.dest('dist/css/lib'));
  return gulp.src(['src/css/**/*.css', '!src/css/**/*.min.css', '!src/css/lib'])
    .pipe(cssnano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('src/css/'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(notify({
      message: 'styles task complete'
    }));

});


// Watch stuff
gulp.task('watch', function () {
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/css/**/*.css', ['styles']);
  gulp.watch('src/css/**/*.*', ['images']);
  gulp.watch('src/index.html', ['html']);
});

// Run gulp
gulp.task('default', ['clean'], function () {
  gulp.start('html', 'images', 'scripts', 'styles');
});