const { DefinePlugin, LoaderOptionsPlugin } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const baseConfig = require('./base.config.js')
const { dependencies } = require('../../package.json')

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
      entry: Object.assign({}, baseConfig.entry, {
        vendor: Object.keys(dependencies)
      }),
      devtool: 'hidden-source-map',
      module: Object.assign({}, baseConfig.module,
        {
          rules: [
            ...baseConfig.module.rules,
            {
              test: /\.css$/,
              use: [
                { loader: MiniCssExtractPlugin.loader },
                'css-loader'
              ]
            }
          ]
        }),
      plugins: [
        ...baseConfig.plugins,
        /**
         * Set environment variable to production OR retain env value
         */
        new DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
        }),
        /**
         * Loader Options
         */
        new LoaderOptionsPlugin({
          minimize: true,
          debug: false
        }),
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: '[name].css',
          chunkFilename: '[id].css'
        })
      ],
      mode: 'production',
      optimization: {
        splitChunks: {
          chunks: 'all',
          automaticNameDelimiter: '-',
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
            }
          }
        },
        minimizer: [new TerserPlugin({
          parallel: true,
          sourceMap: true,
          extractComments: 'all',
          terserOptions: {
            output: {
              comments: false
            }
          }
        })]
      }
    }
  )

  /** Return our config object */
  return config
}
