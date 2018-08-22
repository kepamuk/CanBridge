const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const gulpJade = require('gulp-jade');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const cssmin = require('gulp-cssnano');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');
const cleanCss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {

  browserSync.init({
    server: "./public_html",
    notify: true
  });

});

gulp.task('minifyImg', () =>
  gulp.src('public_html/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public_html/img/'))
);

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
  return gulp.src([
    './node_modules/bootstrap/scss/bootstrap-grid.scss',
    './node_modules/slick-carousel/slick/slick.scss',
    './node_modules/aos/src/sass/aos.scss',
    './node_modules/aos/dist/aos.css',
    "./public_html/sass/*.sass"
  ])
    .pipe(sass())
    .pipe(concat('main.min.css'))
    .pipe(cleanCss())
    .pipe(gulp.dest("public_html/css"))
});

gulp.task('prefix', ['sass'], function () {
  return gulp.src([
    "public_html/css/main.css"
  ])
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest("public_html/css"))
    .pipe(browserSync.stream());
});

// Gulp Jade task
gulp.task('jade', function () {
  return gulp.src("public_html/*.jade")
    .pipe(gulpJade({
      pretty: true
    }))
    .pipe(gulp.dest("public_html/"))
});

gulp.task('scripts', function () {
  const files = [
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/jquery-parallax.js/parallax.min.js',
    './node_modules/slick-carousel/slick/slick.min.js',
    './node_modules/aos/dist/aos.js'
  ];

  return gulp.src(files)
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .on('error', function (err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulp.dest('public_html/scripts'));
});

gulp.task('mainscript', function () {
  return gulp.src('./public_html/js/main.js')
    .pipe(gulp.dest('public_html/scripts'));
});

// Watch task
gulp.task('watch', ['serve', 'scripts', 'mainscript', 'minifyImg'], function () {
  gulp.watch("public_html/sass/*.sass", ['prefix']);
  gulp.watch("public_html/*.jade", ['jade']).on('change', browserSync.reload);
  gulp.watch("public_html/js/*.js", ['mainscript']).on('change', browserSync.reload);
});

gulp.task('default', ['watch']);
