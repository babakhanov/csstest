const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || 'development';


module.exports = {
  context: __dirname + '/src',

  entry: {
    app: "./app"

  },

  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: '[name]-[hash].js',
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: [/node_modules/],
      use: [{
        loader: 'babel-loader'
      }]
    },{
      test: /\.(eot|woff|woff2|ttf|svg|png|gif|jpg)$/,
      loader: 'file-loader?name=[path][name].[ext]'
    },{
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: false,
              minimize: NODE_ENV === 'production',
            }
          },{
            loader: 'sass-loader',
            options: {
              sourceMap: false,
              sourceComments: NODE_ENV !== 'production'
            }
          }
        ]
      })
    }]
  },

  resolve: {
    modules: ['node_modules', 'src']
  },

  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "/dist"),
    hot: false,
    inline: false
  },

  devtool: process.env.NODE_ENV === 'development' ? (process.env.DEVTOOL || 'eval') : false,

  plugins: [
    new ExtractTextPlugin("style-[hash].css"),
    new HtmlWebpackPlugin()
  ],

}

if (NODE_ENV === 'production'){
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      compress: {
        warnings: false,
        drop_console: true,
        unsafe:       true
      }
    })
  );
}

