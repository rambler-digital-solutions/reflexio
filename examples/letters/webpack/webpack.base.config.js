const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const ProjectDIR = path.resolve(__dirname, '../') + '/'
const SourceDIR = ProjectDIR + 'src/'
const BuildDIR = ProjectDIR + './build/'

module.exports = {
  entry: {
    app: SourceDIR + '_root/index.tsx'
  },
  externals: {},
  output: {
    publicPath: '/',
    path: path.resolve(BuildDIR),
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
              '@babel/preset-react'
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }]
            ]
          }
        },
        include: [
          path.resolve(SourceDIR),
        ],
      },
      {
        test: /\.less$/i,
        use: [
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
        ],
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
    modules: ['node_modules', SourceDIR],
    alias: { 'src': SourceDIR },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
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
      template: path.resolve(ProjectDIR, './public/index.html')
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: '../tsconfig.json'
      }
    })
  ]
}