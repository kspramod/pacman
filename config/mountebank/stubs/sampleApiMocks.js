const apiUris = require('../../helpers/api-uris')

const wait = 100

exports.sampleResponse = {
  'predicates': [
    {
      'equals': {
        'method': 'GET',
        'path': `${apiUris.testApiUri}`
      }
    }
  ],
  'responses': [
    {
      'is': {
        'statusCode': 200,
        'headers': { 'Access-Control-Allow-Origin': '*' },
        'body': {}
      },
      '_behaviors': {
        'wait': wait
      }
    }
  ]
}
