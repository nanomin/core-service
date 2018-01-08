import webpack from 'webpack';
import path from 'path';
import qs from 'querystring';

process.env.NODE_ENV = process.env.NODE_ENV || "development";

export default {
  devtool: '#eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index.js'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: 'public/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    extensions: ['.js','.jsx'],
    alias: {
      request: 'browser-request'
    }
  },
  module: {
    loaders: [
      // Javascript
      {
        test: [/\.(js|jsx)$/],
        loader: 'babel-loader',
        include: path.join(__dirname, 'client'),
        query: {
          "env": {
            "development": {
              "presets": ["react-hmre"],
              "plugins": [
                ["react-transform", {
                  "transforms": [{
                    "transform": "react-transform-hmr",
                    "imports": ["react"],
                    "locals": ["module"]
                  }]
                }]
              ]
            }
          },
        }
      },

      // CSS
      {
        test: /\.css$/,
        include: path.join(__dirname, 'client'),
        loader: 'style-loader!css-loader?' + qs.stringify({
          modules: true,
          importLoaders: 1,
          localIdentName: '[path][name]-[local]'
        })
      }

    ]
  }
};
