const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
/*
This happens because your server does not know what to do when it is hit by the /about route, initially when the browser has no asset files (HTML, JS, etc.). It occurs only when you are at /about and you refresh the page.

React router is a client side router, and hence the browser needs to load the client assets completely before it can work on your routes.

https://stackoverflow.com/questions/68379052/routing-not-working-in-a-react-app-with-webpack
*/

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8083/',
  },
  devServer: {
    port: 8083,
    historyApiFallback: {
      index: 'index.html',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'dashboard',
      filename: 'remoteEntry.js',
      exposes: {
        './DashboardApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
