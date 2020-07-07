const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');
const temlate_folder = './src/template';
const templatePlugin = fs.readdirSync(temlate_folder)
  .filter(x => x.indexOf('.html') > -1)
  .map(filename => new HtmlWebpackPlugin({
    cache: false,
    filename: `template/${filename}`,
    template: `${temlate_folder}/${filename}`,
    chunks: []
  }));


var extractPlugin = new MiniCssExtractPlugin({
  chunkFilename: '[hash].css',
});

const { CleanWebpackPlugin } = require('clean-webpack-plugin');



module.exports = {
  entry: {
    main: ['./src/js/main.js', './src/scss/main.scss'],
    // page1: ['./src/js/page1.js','./src/scss/page1.scss]
  },
  output: {
    chunkFilename: '[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  devServer: {
    open: true
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          { loader: 'html-loader' }
        ]
      },
      {
        test: /.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
          outputPath: 'assets/images',
          publicPath: 'assets/images',
        }

      },

    ],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  plugins: [
    extractPlugin,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'//這邊以上是新增
    }),
    new HtmlWebpackPlugin({
      cache: false,
      filename: 'index.html',
      template: 'index.html',
      chunks: ['main'],
      favicon: 'src/assets/images/logo.png'
    }),
    ...templatePlugin,

    // new HtmlWebpackPlugin({
    //     filename: 'page1.html',
    //     template: 'page1.html',
    //     chunks: ['page1']
    // }),
    new CleanWebpackPlugin(),
    new CopyPlugin(
      [
        { from: 'src/static', to: 'static' },
        { from: 'src/assets/images', to: 'assets/images' },
      ]
    ),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
  },
  resolve: {
    alias: {
      '@img': path.resolve(__dirname, 'src/assets/images'),
    },
  }
};