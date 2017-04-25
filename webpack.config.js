const path = require('path');
//process.traceDeprecation = true; //Trace the router of deprecated errors
process.noDeprecation = true; //No deprecation warnings
module.exports = {
  // the entry file for the bundle
  entry: path.join(__dirname, '/client/src/index.jsx'),

  // the bundle file we will get in the result
  output: {
    path: path.join(__dirname, '/client/dist/js'),
    filename: 'app.js',
  },

  module: {

    // apply loaders to files that meet given conditions
    loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, '/client/src'),
      loader: 'babel-loader',
      query: {
        presets: ["react", "es2015"]
      }
    }],
  },
};