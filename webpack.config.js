"use strict";

const
  webpack = require('webpack'),
  path = require('path'),
  UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
  ExtractTextPlugin = require("extract-text-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV || 'development';
const watch = NODE_ENV === "production" ? false : true;
const sourcemapEnable = NODE_ENV === "production" ? false : "inline-source-map";

module.exports = [];

// javaScript config

let js_config = {
  entry: {
    script : path.join(__dirname + "/src/js/app.js")
  },
  output: {
    path       : path.join(__dirname, 'js'),
    publicPath : '/js/',
    filename   : '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  watch: watch,
  plugins: [

    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "windows.jQuery": "jquery"
    }),

  ].concat((NODE_ENV == 'development') ? [

    //new webpack.HotModuleReplacementPlugin()

  ] : [

    new UglifyJsPlugin({
      uglifyOptions: {
        ecma: 5,
        output: {
          comments: false,
          beautify: false,
        },
        warnings: false
      }
    })

  ]),

  externals: {
    "jquery": "jQuery"
  }

};

module.exports.push( js_config );


// Css config ( included fonts, background - images for css )

let minimize_css = false;

let css_loaders = [
  {loader: 'css-loader', options: {sourceMap: true, minimize: minimize_css}},
  {loader: 'sass-loader', options: {sourceMap: true}}
];

if (NODE_ENV === 'production') {

  minimize_css = true;

  css_loaders = [
    {loader: 'css-loader', options: {sourceMap: true, minimize: minimize_css}},
    {loader: 'postcss-loader', options: {sourceMap: true}},
    {loader: 'sass-loader', options: {sourceMap: true}}
  ];

}

let css_config = {
  context: path.join(__dirname, 'src', 'scss'),
  entry   : {
    style : './style.init.scss'
  },
  output  : {
    path       : path.resolve(__dirname),
    publicPath : './',
    filename   : '[name].css'
  },
  watch: watch,
  devtool: sourcemapEnable,
  module: {
    rules: [
      // Sass
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: css_loaders
        })
      },
      // Fonts
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: './',
              outputPath: './',
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      },
      // Images for css property - background
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: './',
              outputPath: './',
              name: 'img/css/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: './[name].css'
    })
  ]
};

module.exports.push(css_config);