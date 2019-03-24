const proxy = require('http-proxy-middleware')

const proxyPort = process.env.BUILD_DOMAIN === 'test' ? '4200' : '3000'

const filterNoFile = (pathname) => pathname.indexOf('/assets/') === -1 || pathname.indexOf('/js/') === -1
module.exports = {
  proxyPort,
  getProxies: () => [
    proxy('/mb',
      {
        target: 'http://localhost:2525',
        pathRewrite: { '^/mb': '' },
        secure: false
      }
    ),
    proxy('/sample',
      {
        target: 'http://localhost:4545',
        secure: false
      }
    ),
    proxy(['**/assets/**', '**/js/**', '**/**.html'],
      {
        target: `http://localhost:${proxyPort}`,
        pathRewrite: {
          '.*/assets': '/assets',
          '.*/js': '/js',
          '.*/*.html': '/*.html'
        },
        secure: false
      }
    ),
    proxy(filterNoFile,
      {
        target: `http://localhost:${proxyPort}`,
        pathRewrite: { '.*': '' },
        secure: false
      }
    )
  ]
}
