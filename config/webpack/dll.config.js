const { DllPlugin } = require('webpack')
const { dependencies } = require('../../package.json')
const { root, writeFile } = require('../helpers')

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  /**
   * Create a definition of the DLL to compare against
   * when running the devserver, so that we can stop if
   * there are mismatched dependencies.
   */
  writeFile('.dll/integrity.json', JSON.stringify(dependencies))

  return {
    /**
     * Create a DLL instance for our dependencies
     */
    entry: {
      dependencies: Object.keys(dependencies)
    },
    /**
     * Define the DLL naming scheme
     */
    output: {
      filename: '[name].bundle.js',
      path: root('.dll'),
      library: '[name]_lib'
    },
    plugins: [
      /**
       * Convert the packages into a DLL for static file consumption
       */
      new DllPlugin({
        path: '.dll/[name]-manifest.json',
        name: '[name]_lib'
      })
    ],
    mode: 'production'
  }
}
