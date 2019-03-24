const isEqual = require('lodash/isEqual')
const { DllReferencePlugin, HotModuleReplacementPlugin, NamedModulesPlugin, DefinePlugin } = require('webpack')
const StyleLintPlugin = require('stylelint-webpack-plugin')

const baseConfig = require('./base.config.js')
const { root, fileExists } = require('../helpers')

const DllDoesntExistMessage = `
=======          DLL's NOT DETECTED          =======
=======                                      =======
=======    run the script "yarn dll" in   =======
=======  order to generate the DLL Manifest. =======
=======                                      =======
======= This will increase the speed of your =======
=======      DEVELOPMENT recompilations      =======
`

const DllOutdatedMessage = `
=======          DLL's Are OUTDATED          =======
=======                                      =======
=======   run the script "yarn dll" in    =======
=======   order to generate an updated DLL   =======
=======               Manifest.              =======
=======                                      =======
======= This will increase the speed of your =======
=======      DEVELOPMENT recompilations      =======
`

/**
 * Webpack2 allows for a function to be exported. This function will
 * be a representation of the command line's --env objects. This allows
 * us to write customisations logically using the env object.
 */
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  /**
   * Create our config object. We are using Object.assign to create a new object
   * as opposed to mutating our base configuration as we may use the base configuration
   * multiple times in different ways and a mutation will break the expected result.
   */
  // TODO: update from Object.assign({}, conf1, conf2) to {...conf1, conf2 } once the spec allows
  const config = Object.assign({}, baseConfig,
    /**
     * Config Overwrites and unset values, If you need to
     * modify an existing value without complete overwrite,
     * update the config object's references after the object
     * assign call.
     */
    {
      entry: [
        'react-hot-loader/patch',
        // activate HMR for React

        'webpack-hot-middleware/client',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint

        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        baseConfig.entry.app
      ],
      /**
       * Change the filename pattern as chunkhashes do not work for HMR
       */
      output: Object.assign({}, baseConfig.output,
        {
          filename: 'js/[name].[hash:8].js'
        }
      ),
      devtool: 'inline-source-map',
      module: Object.assign({}, baseConfig.module,
        {
          rules: [
            ...baseConfig.module.rules,
            {
              test: /\.jsx?$/,
              enforce: 'pre',
              use: [
                {
                  loader: 'eslint-loader'
                }
              ],
              include: root('src')
            },
            {
              test: /\.css$/,
              use: [
                {
                  loader: 'style-loader'
                },
                {
                  loader: 'css-loader'
                }
              ]
            }
          ]
        }
      ),
      // Enable the Webpack dev server which will build, serve, and reload our
      // project on changes.
      //  webpack-dev-server is disabled as we will be using browser sync
      /* devServer: {
        contentBase: root('src'),
        compress: true,
        port: 9000,
        inline: true,
        proxy: {
          '/api': {
            target: 'http://localhost:4545',
            secure: false
          }
        }
      }, */
      plugins: [
        ...baseConfig.plugins,
        /**
         * Show Stylesheet Lint errors
         * This is warnings only as the strictness of our rules can be
         * applied in the build pipeline using scripts.
         */
        new StyleLintPlugin(),
        /**
         * Set environment variable to development
         */
        new DefinePlugin({
          'process.env.NODE_ENV': '\'development\''
        }),
        /**
         * Enable HMR
         */
        new HotModuleReplacementPlugin(),
        new NamedModulesPlugin()
      ],
      mode: 'development'
    }
  )

  /**
   * Check if DLL and Integrity files exist
   */
  if (fileExists('.dll/dependencies-manifest.json') && fileExists('.dll/integrity.json')) {
    /**
     * Declare two objects for comparison
     */
    const integrity = require(root('.dll/integrity.json'))
    const { dependencies } = require(root('package.json'))

    /**
     * Deep compare the integrity against the package JSON.
     * This allows us to emit errors to the developer to warn
     * them to update their dependencies.
     */
    if (isEqual(integrity, dependencies)) {
      /**
       * Add the DLL Reference Plugin if pass both checks
       */
      config.plugins = [
        ...config.plugins,
        new DllReferencePlugin({
          context: '.dll',
          manifest: require(root('.dll/dependencies-manifest.json'))
        })
      ]
    } else {
      /**
       * Emit error that the DLL doesn't match the package.json
       */
      console.log(DllOutdatedMessage)
      process.exit()
    }
  } else {
    /**
     * Emit error that the DLL's don't exist
     */
    console.log(DllDoesntExistMessage)
    process.exit()
  }

  /** Return our config object */
  return config
}
