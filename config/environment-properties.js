const ip = require('ip')

let config

if (process.env.TEST_DOMAIN === 'ci') {
  config = {
    baseUrl: `http://${ip.address()}:4200`,
    mountebankUrl: `http://${ip.address()}:2525`,
    maxInstance: 5,
    dataSheet: 'ST',
    seleniumServerAddress: 'http://localhost:4444/wd/hub',
    seleniumServerHost: 'localhost',
    seleniumServerPort: '4444',
    tagExpression: 'not @Deprecated and not @WIP and not @Duplicate and not @OOS and not @FR',
    feature: '*'
  }
} else {
  config = {
    baseUrl: 'http://localhost:4200/',
    mountebankUrl: 'http://localhost:2525',
    maxInstance: 4,
    dataSheet: 'ST',
    tagExpression: 'not @Deprecated and not @WIP and not @Duplicate and not @OOS and not @FR',
    feature: '*'
  }
}

module.exports = config
