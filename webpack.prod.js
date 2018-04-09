const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');

const config = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'output.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js?$/, // files ending with .js
        exclude: /node_modules/, // exclude the node_modules directory
        loader: 'babel-loader', // use this (babel-core) loader
        include: [
          path.resolve(__dirname, './src'),
          // webpack-dev-server#1090 for Safari
          /node_modules\/webpack-dev-server/,
        ],
      },
      {
        test: /\.scss$/, // all files starting with .scss
        use: ExtractTextWebpackPlugin.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.jsx?$/, // files ending with .jsx
        exclude: /node_modules/, // exclude the node_modules directory
        loader: 'babel-loader', // use this (babel-core) loader
        include: [
          path.resolve(__dirname, './src'),
          // webpack-dev-server#1090 for Safari
          /node_modules\/webpack-dev-server/,
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['file-loader?context=src/assets/images/&name=images/[path][name].[ext]', { // images loader
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true,
            },
            gifsicle: {
              interlaced: false,
            },
            optipng: {
              optimizationLevel: 4,
            },
            pngquant: {
              quality: '75-90',
              speed: 3,
            },
          },
        }],
        exclude: /node_modules/,
        include: __dirname,
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextWebpackPlugin('styles.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new OptimizeCSSAssets({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true,
    }),
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        ecma: 5,
        warnings: false,
        //   parse: { },
        compress: {
          passes: 3,
        },
      //   // mangle: {
      //   //   properties: {
      //   //   // mangle property options
      //   //   },
      //   // },
      //   output: {
      //     comments: false,
      //     beautify: false,
      //   },
      //   // toplevel: false,
      //   // nameCache: null,
      //   // ie8: false,
      //   // keep_classnames: undefined,
      //   // keep_fnames: false,
      //   // safari10: false,
      },
    }),
    new webpack.HashedModuleIdsPlugin(),
  ],
};

module.exports = config;

