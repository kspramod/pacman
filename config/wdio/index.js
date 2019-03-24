let config

if (process.env.TEST_DOMAIN === 'ci' || process.env.TEST_DOMAIN === 'ci-local' || process.env.TEST_DOMAIN === 'ci-server') {
  config = require('./wdio.CI.conf')
  console.log('CI Environment ##################')
} else if (process.env.TEST_DOMAIN === 'sit') {
  console.log('SIT Environment ###############')
  config = require('./wdio.conf')
} else {
  console.log('NON-CI Environment ###############')
  config = require('./wdio.conf')
}

module.exports = config
