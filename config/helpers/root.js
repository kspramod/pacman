const path = require('path')

/**
 * @param {string} pathString input path string
 * @returns {string} PathString path string relative to the root folder resolved with provided parameters
 */
exports.root = path.join.bind(path, path.resolve(__dirname, '../..'))
