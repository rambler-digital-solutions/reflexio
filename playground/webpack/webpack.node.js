/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const projectDir = path.resolve(__dirname, '..');
const sourceDir = path.resolve(projectDir, 'src');
const buildDir = path.resolve(projectDir, 'dist');

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
          },
        },
        include: [sourceDir],
      },
    ],
  },
  resolve: {
    modules: [sourceDir, 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  mode: 'development',
  target: 'node',
  entry: path.resolve(sourceDir, '_redux/index.ts'),
  output: {
    path: buildDir,
    filename: 'index.js',
    library: '$',
    libraryTarget: 'umd',
  },
};
