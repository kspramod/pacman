const HtmlWebpackPlugin = require('html-webpack-plugin')

const { root } = require('../helpers')

module.exports = {
  // Tell Webpack which file kicks off our app.
  entry: {
    app: './src/app/index.jsx'
  },
  // Tell Weback to output our bundle to ./build/js/bundle.js
  output: {
    path: root('build'),
    filename: 'js/[name].[hash:8].js',
    publicPath: '',
    pathinfo: true
  },
  // Tell Webpack which directories to look in to resolve import statements.
  // Normally Webpack will look in node_modules by default but since we’re overriding
  // the property we’ll need to tell it to look there in addition to the
  // bower_components folder.
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [root('src'), 'node_modules'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  // These rules tell Webpack how to process different module types.
  // Remember, *everything* is a module in Webpack. That includes
  // CSS, and (thanks to our loader) HTML.
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        include: [root('src'), root('config/helpers')]
      },
      {
        test: /\.(eot|otf|ttf|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader?name=assets/font/[name].[hash:8].[ext]',
        include: [root('src')]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'file-loader?name=assets/img/[name].[hash:8].[ext]',
        include: [root('src')]
      },
      {
        test: /\.ico$/,
        loader: 'file-loader?name=assets/img/[name].[ext]',
        include: [root('src')]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: root('src/index.html'),
      filename: 'index.html',
      inject: 'body'
    })
  ]
}
