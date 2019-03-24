const ip = require('ip')

exports.apiConfig = ((env = process.env.BUILD_DOMAIN) => {
  switch (env) {
    case 'sit':
      return { schema: 'https', serverName: 'sit.server.domain' }
    case 'prod':
      return { schema: 'https', serverName: 'production.server.domain' }
    case 'development':
    case 'ci':
    case 'test':
      return { schema: 'http', serverName: 'localhost:4545' }
    case 'grid':
      return { schema: 'http', serverName: `${ip.address()}:4545` }
    default:
      return undefined
  }
})()
