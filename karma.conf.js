const webpackConfig = require('./webpack.config.js')
delete webpackConfig.entry

// Base

const karmaConfig = (config) => {
  config.set({
    singleRun: true,
    browsers: ['jsdom'],
    frameworks: ['mocha', 'chai-as-promised', 'sinon-chai', 'chai'],
    files: ['test/karma.opts'],
    reporters: ['spec'],
    preprocessors: {
      'test/karma.opts': ['webpack'],
      [require.resolve('chai-as-promised')]: ['webpack'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    client: {
      mocha: {
        opts: 'test/mocha.opts'
      }
    }
  })
}

// Module API

module.exports = karmaConfig
