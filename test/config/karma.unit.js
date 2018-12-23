// Karma configuration
// Generated on Thu Dec 20 2018 19:22:16 GMT+0100 (Central European Standard Time)

module.exports = function (config) {

  config.set({

    basePath: '../..',
    frameworks: ['mocha', 'chai'],
    files: [
      'lib/**/*.js',
      'lib/**/*.css',
      'test/**/*.js'
    ],
    exclude: [
    ],
    preprocessors: {
      'lib/**/*.js': ['babel']
    },
    reporters: ['spec'],
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
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity,
    babelPreprocessor: {
      options: {
        presets: ['env'],
        sourceMap: 'inline'
      },
      filename: function (file) {

        return file.originalPath.replace(/\.js$/, '.es5.js');
      
      },
      sourceFileName: function (file) {

        return file.originalPath;
      
      }
    }

  });

};
