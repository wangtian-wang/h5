const path = require('path');
const webpack = require('webpack');
const uglify = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const babelCorn = require('babel-core');
const config = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, './src/js/index.js'),
    detail: path.resolve(__dirname, './src/js/detail.js'),
    news: path.resolve(__dirname, './src/js/news.js')
  },
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: 'js/[name]-[hash:5].js',
    //publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
        query: {
          "presets": ["@babel/preset-env"]
        }
      },
      {
        test: /\.tpl$/,
        loader: 'ejs-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [autoprefixer('last 5 versions')];
              }
            }
          },
          {
            loader: 'url-loader',
            options: {
              esModule: false
            }
          },
        ]

      },
      {
        test: /\.scss$/,
        use: [

          'style-loader',

          'css-loader',

          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [autoprefixer('last 5 versions')];
              }
            }
          },

          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/i,
        loaders: [
          'url-loader?name=img/[name].[ext]',
          'image-webpack-loader',

        ]
      },

    ]
  },
  plugins: [
    new uglify(),
    new htmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      title: '新闻头条',
      chunksSortMode: 'manual',
      excludeChunks: ['node_modules'],
      chunks: ['index'],
      // 引入入口文件的个数
      hash: true
    }),
    new htmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      filename: 'detail.html',
      template: path.resolve(__dirname, 'src/detail.html'),
      title: '新闻详情页面',
      chunksSortMode: 'manual',
      excludeChunks: ['node_modules'],
      chunks: ['detail'],
      hash: true
    }),
    new htmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      filename: 'news.html',
      template: path.resolve(__dirname, 'src/news.html'),
      title: '我的收藏',
      chunksSortMode: 'manual',
      excludeChunks: ['node_modules'],
      chunks: ['news'],
      hash: true
    }),
    //  new cleanWebpackPlugin({
    //   cleanOnceBeforeBuildPatterns: ['dist/js', 'dist/*.html']
    // })
  ],
  devServer: {
    watchOptions: {
      ignored: /node_modules/
    },
    open: true,
    host: 'localhost',
    port: 8888
  },

}
module.exports = config;