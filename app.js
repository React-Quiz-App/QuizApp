const express = require('express');
const morgan = require('morgan');
const { join } = require('path');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config');

const app = express();

// Body Parsing
app.use(express.json());

// Request/Response Logging
app.use(morgan('dev'));

// Webpack Dev Middleware
const compiler = webpack(webpackConfig);
app.use(
  middleware(compiler, {
    // publicPath: join(__dirname, "public"),
    publicPath: webpackConfig.output.publicPath,
    writeToDisk: true,
  })
);

// static file-serving middleware
app.use(express.static(join(__dirname, 'public')));

module.exports = app;
