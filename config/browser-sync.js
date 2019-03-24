/**
 * Require Browsersync along with webpack and middleware for it
 */
const browserSync = require('browser-sync')
const webpack = require('webpack')

const historyApiFallback = require('connect-history-api-fallback')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const configProxies = require('./helpers/dev-proxies')
/**
 * Require ./webpack.config.js and make a bundler from it
 */
const webpackConfig = require('../webpack.config')(process.env.NODE_ENV)
const bundler = webpack(webpackConfig)

const middleware = [
  webpackDevMiddleware(bundler, {
    // IMPORTANT: dev middleware can't access config, so we should
    // provide publicPath by ourselves
    publicPath: webpackConfig.output.publicPath,

    // pretty colored output
    stats: { colors: true }

    // for other settings see
    // http://webpack.github.io/docs/webpack-dev-middleware.html
  }),
  webpackHotMiddleware(bundler),
  historyApiFallback({
    index: webpackConfig.output.publicPath
  })
].concat(configProxies.getProxies())

/**
 * Run Browsersync and use middleware for Hot Module Replacement
 */
browserSync({
  server: {
    baseDir: 'src',
    middleware
  },
  port: configProxies.proxyPort,

  // no need to watch '*.js' here, webpack will take care of it for us,
  // including full page reloads if HMR won't work
  files: [
    '../src/index.html'
  ]
})
