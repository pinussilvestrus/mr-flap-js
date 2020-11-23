const path = require('path');

const gulp = require('gulp');

const open = require('gulp-open');

const connect = require('gulp-connect');

const del = require('del');

const concat = require('gulp-concat');

const rename = require('gulp-rename');

const babel = require('gulp-babel');

const uglify = require('gulp-uglify');

const uglifycss = require('gulp-uglifycss');

const pump = require('pump');

const KarmaServ = require('karma').Server;

const configuration = {
  paths: {
    src: {
      css: 'lib/**/*.css',
      html: 'lib/index.dev.html',
      js: 'lib/**/*.js',
      vendor: 'lib/vendor/**/*'
    },
    dist: 'dist',
    dev: {
      css: 'mrflap.dev.css',
      js: 'mrflap.dev.js'
    },
    prod: {
      css: 'mrflap.min.css',
      js: 'mrflap.min.js'
    },
    test: path.join(__dirname, 'test')
  },
  localServer: {
    port: 8001,
    testPort: 9999,
    url: 'http://localhost:8001/'
  }
};

/** DEVELOPMENT  ******/

gulp.task('clean', function () {

  return del([
    './dist/*',
    '!./dist/.gitignore',
    '!./dist/mrflap.min.*'
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
    .pipe(concat(configuration.paths.dev.css))
    .pipe(gulp.dest(configuration.paths.dist))
    .pipe(connect.reload());

});

gulp.task('js', function () {

  return gulp.src(configuration.paths.src.js)
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(concat(configuration.paths.dev.js))
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

/** TESTING  ******/

gulp.task('test', gulp.series(['default'], function (done) {

  return new KarmaServ({
    configFile: `${configuration.paths.test}/config/karma.unit.js`,
    singleRun: true
  }, done).start();

}));

/** PRODUCTION  ******/

gulp.task('buildJs', function (done) {

  pump([
    gulp.src(`${configuration.paths.dist}/${configuration.paths.dev.js}`),
    rename(configuration.paths.prod.js),
    uglify(),
    gulp.dest('dist')
  ], done);

});

gulp.task('buildCss', function (done) {

  pump([
    gulp.src(`${configuration.paths.dist}/${configuration.paths.dev.css}`),
    rename(configuration.paths.prod.css),
    uglifycss(),
    gulp.dest('dist')
  ], done);

});

gulp.task('build', gulp.series(['default', 'buildJs', 'buildCss']));
