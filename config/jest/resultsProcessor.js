const { root } = require('../helpers')

module.exports = (results) => {
  process.env.TEST_REPORT_PATH = root('reports/unitTest')
  process.env.JEST_SUITE_NAME = '<Project Name> Unit Tests'
  process.env.JEST_JUNIT_OUTPUT = root('reports/unit/junit.xml')
  require(root('node_modules/jest-sonar-reporter/index')).apply(this, [results])
  // add any other processor you need
  return results
}
