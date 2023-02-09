const webpack = require("webpack")
const baseConfig = require('./webpack.base.config');

module.exports = Object.assign(baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  performance: {
    hints: false,
  },
  devServer: {
    host: '0.0.0.0',
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    ...baseConfig.plugins,
    new webpack.HotModuleReplacementPlugin()
  ],
})