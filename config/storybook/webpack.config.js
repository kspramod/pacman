const { root } = require('../helpers')

// Export a function. Accept the base config as the only param.
module.exports = (storybookBaseConfig/* , configType  */) => {
  // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  storybookBaseConfig.module.rules.push(
    {
      test: /\.jsx?$/,
      use: 'babel-loader',
      include: [root('src'), root('node_modules/@anz/')]
    },
    {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader'],
      include: root('src')
    },
    {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader']
    },
    {
      test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
      loader: 'file-loader'
    },
    {
      test: /\.(jpe?g|png|gif|svg|ico)$/,
      loader: 'file-loader?name=assets/[name].[ext]'
    }
  )
  // Return the altered config
  return storybookBaseConfig
}
