import path from 'path';
import { fileURLToPath } from 'url';

import pathBrowserify from 'path-browserify';
import osBrowserify from 'os-browserify/browser';
import cryptoBrowserify from 'crypto-browserify';
import streamBrowserify from 'stream-browserify';
import assert from 'assert';
import util from 'util';
import url from 'url';
import querystring from 'querystring-es3';
import streamHttp from 'stream-http';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'production',
  entry: './src/basic.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      "path": pathBrowserify,
      "os": osBrowserify,
      "crypto": cryptoBrowserify,
      "stream": streamBrowserify,
      "assert": assert,
      "util": util,
      "url": url,
      "querystring": querystring,
      "http": streamHttp,
      "fs": false,
      "net": false,
      "tls": false,
      "readline": false,
      "http2": false
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};