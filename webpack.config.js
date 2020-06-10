const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const entry = {
  home: './src/Home.jsx',
  about: './src/About.jsx',
  subscribe: './src/Subscribe.jsx',
};

const prerenderPlugins = Object.keys(entry).map(key =>
  new HtmlWebpackPlugin({
    inject: false,
    chunks: [key],
    filename: `${key}.html`,
    template: `!!prerender-loader?string&entry=${entry[key]}!./src/template.html`,
  }),
);

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: "assets/[name]/build/bundle.js",
  },
  plugins: [
    new CleanWebpackPlugin(['public']),
    ...prerenderPlugins,
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            // uses .babelrc as config
            loader: 'babel-loader'
          }
        ]
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
