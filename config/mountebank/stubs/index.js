const sampleMocks = require('./sampleApiMocks')

const headersAllowed = [
  'Accept',
  'Access-Control-Allow-Origin',
  'Access-Control-Allow-Headers',
  'RequestID',
  'Content-Type',
  'Authorization'
]

const optionsRequest = {
  'predicates': [
    {
      'equals': {
        'method': 'OPTIONS'
      }
    }
  ],
  'responses': [
    {
      'is': {
        'statusCode': 200,
        'headers': {
          'Access-Control-Allow-Origin': '*',
          'Allow': 'OPTIONS,POST,PUT',
          'Content-Type': 'application/xml',
          'Access-Control-Allow-Headers': headersAllowed.join(','),
          'Access-Control-Allow-Methods': 'OPTIONS,POST,PUT'
        },
        'body': ''
      },
      '_behaviors': {
        'wait': 100
      }
    }
  ]
}

module.exports = () => {
  let anzidHubImposter = {}
  anzidHubImposter.port = 4545
  anzidHubImposter.protocol = 'http'
  anzidHubImposter.name = 'API Stub'
  anzidHubImposter.stubs = []

  anzidHubImposter.stubs.push(optionsRequest)

  Object.keys(sampleMocks).forEach((keyName) => {
    anzidHubImposter.stubs.push(sampleMocks[keyName])
  })

  return anzidHubImposter
}
