// Karma configuration
// Generated on Thu Dec 20 2018 19:22:16 GMT+0100 (Central European Standard Time)

module.exports = function (config) {

  config.set({

    basePath: '../..',
    frameworks: ['mocha', 'chai'],
    files: [
      'dist/*',
      'test/**/*.js',
      'lib/**/*.js'
    ],
    exclude: [
      'lib/jquery/*',
      'lib/main/*'
    ],
    preprocessors: {
      'dist/**/*.js': ['babel'],
      'test/**/*.js': ['babel'],
      'dist/*.html': ['html2js'],
      'lib/**/*.js': ['coverage']
    },
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/'
    },
    specReporter: {
      maxLogLines: 5,
      suppressErrorSummary: true,
      suppressFailed: false,
      suppressPassed: false,
      suppressSkipped: true,
      showSpecTiming: false
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome', 'ChromeHeadless', 'ChromeHeadlessNoSandbox'],

    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    singleRun: true,
    concurrency: Infinity,
    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      },
      filename: function (file) {

        return file.originalPath.replace(/\.js$/, '.es5.js');

      },
      sourceFileName: function (file) {

        return file.originalPath;

      }
    },
    html2JsPreprocessor: {
      stripPrefix: 'dist/'
    }

  });

};
