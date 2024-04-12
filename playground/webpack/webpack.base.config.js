/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const projectDir = path.resolve(__dirname, '..');
const sourceDir = path.resolve(projectDir, 'src');
const reflexioDir = path.resolve(projectDir, '../packages');
const buildDir = path.resolve(projectDir, 'dist');

module.exports = {
  entry: {
    app: path.resolve(sourceDir, '_root/index.tsx'),
  },
  externals: {},
  output: {
    publicPath: '/',
    path: buildDir,
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
            plugins: [['@babel/plugin-proposal-decorators', {legacy: true}]],
          },
        },
        include: [sourceDir, reflexioDir],
      },
      {
        test: /\.less$/i,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: false,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules', sourceDir],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },

  target: 'web',
  context: __dirname,
  performance: {
    hints: 'warning',
    maxAssetSize: 500000,
    maxEntrypointSize: 500000,
  },
  stats: 'errors-only',

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(projectDir, 'public/index.html'),
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: '../tsconfig.json',
      },
    }),
  ],
};
