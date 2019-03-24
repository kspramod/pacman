const { baseUrl, seleniumServerHost, seleniumServerPort } = require('../environment-properties')
const baseConfig = require('./wdio.conf.js').config

const config = Object.assign({}, baseConfig, {
  baseUrl,
  path: '/wd/hub',
  host: seleniumServerHost,
  port: seleniumServerPort,
  services: []
})

console.log('Using selenium server: ' + config.host + ':' + config.port)

exports.config = config
