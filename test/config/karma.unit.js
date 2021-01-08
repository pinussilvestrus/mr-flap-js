module.exports = function (config) {

  const browsers = (process.env.TEST_BROWSERS ||
    'Chrome,ChromeHeadless,ChromeHeadlessNoSandbox'
  ).split(',');

  config.set({

    basePath: '../..',
    frameworks: ['mocha', 'sinon-chai'],
    files: [
      'test/**/*',
      'lib/**/*.js'
    ],
    preprocessors: {
      'test/**/*.js': ['babel'],
      'test/*.html': ['html2js'],
      'lib/**/!(jquery.min).js': ['coverage'] // exclude jquery, include all other
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
    browsers: browsers,

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
        presets: ['@babel/preset-env'],
        sourceMap: 'inline'
      },
      filename: function (file) {

        return file.originalPath;

      },
      sourceFileName: function (file) {

        return file.originalPath;

      }
    },
    html2JsPreprocessor: {
      stripPrefix: 'test/'
    }

  });

};
