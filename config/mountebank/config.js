const axios = require('axios')

const { mountebankUrl } = require('../environment-properties')
const projectStubs = require('./stubs/index')

const stubImposters = { 'imposters': [] }

stubImposters.imposters.push(projectStubs())

const axiosInstance = axios.create({
  baseURL: mountebankUrl,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
})

Promise.resolve(axiosInstance.put('/imposters', stubImposters)
  .then(function () {
    console.log('Mountebank setup finished.')
    console.log('Stubs can be accessed in ', mountebankUrl)
  })
  .catch(function (error) {
    console.log(error)
  })
)
