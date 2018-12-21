const gulp = require('gulp');

const open = require('gulp-open');

const connect = require('gulp-connect');

const del = require('del');

const concat = require('gulp-concat');

const rename = require('gulp-rename');

const configuration = {
  paths: {
    src: {
      css: './lib/**/*.css',
      html: './lib/index.dev.html',
      js: './lib/**/*.js',
      vendor: './lib/vendor/*'
    },
    dist: './dist'
  },
  localServer: {
    port: 8001,
    url: 'http://localhost:8001/'
  }
};

gulp.task('clean', function () {
  return del([
    './dist/*',
    '!./dist/.gitignore'
  ]);
});

gulp.task('html', function () {
  return gulp.src(configuration.paths.src.html)
    .pipe(rename('index.html'))
    .pipe(gulp.dest(configuration.paths.dist))
    .pipe(connect.reload());
});

gulp.task('css', function () {
  return gulp.src(configuration.paths.src.css)
    .pipe(concat('mrflap.dev.css'))
    .pipe(gulp.dest(configuration.paths.dist))
    .pipe(connect.reload());
});

gulp.task('js', function () {
  return gulp.src(configuration.paths.src.js)
    .pipe(concat('mrflap.dev.js'))
    .pipe(gulp.dest(configuration.paths.dist))
    .pipe(connect.reload());
});

gulp.task('vendor', function () {
  return gulp.src(configuration.paths.src.vendor)
    .pipe(gulp.dest(`${configuration.paths.dist}/vendor`));
});

gulp.task('connect', function () {
  return connect.server({
    root: configuration.paths.dist,
    port: configuration.localServer.port,
    livereload: true
  });
});

gulp.task('open', function () {
  return gulp.src(`${configuration.paths.dist}/index.html`)
    .pipe(open({ uri: configuration.localServer.url }));
});

gulp.task('watchCss', function () {
  return gulp.watch(configuration.paths.src.css, gulp.series(['css']));
});

gulp.task('watchHtml', function () {
  return gulp.watch(configuration.paths.src.html, gulp.series(['html']));
});

gulp.task('watchJs', function () {
  return gulp.watch(configuration.paths.src.js, gulp.series(['js']));
});

gulp.task('watch', gulp.parallel(['watchCss', 'watchHtml', 'watchJs']));

gulp.task('dev', gulp.parallel(['connect', 'open', 'watch']));

gulp.task('default', gulp.series(['clean', 'html', 'css', 'js', 'vendor']));
