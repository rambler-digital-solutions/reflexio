/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const ProjectDIR = path.resolve(__dirname, '../') + '/';
const SourceDIR = ProjectDIR + '/';
const BuildDIR = ProjectDIR + 'playground/build/';

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
        include: [path.resolve(SourceDIR)],
      },
    ],
  },
  resolve: {
    modules: [SourceDIR, 'node_modules'],
    alias: { src: SourceDIR + '/playground/src' },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  mode: 'development',
  target: 'node',
  entry: SourceDIR + '/playground/src/_redux/index.ts',
  output: {
    path: BuildDIR,
    filename: 'index.js',
    library: '$',
    libraryTarget: 'umd',
  },
};
