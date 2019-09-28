const path = require('path')

const webpack = require('webpack')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const clone = require('lodash/cloneDeep')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

const PROD = process.env.NODE_ENV === 'production'

const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new LodashModuleReplacementPlugin({
    caching: true,
    cloning: true
  })
]

if (PROD) {
  plugins.push(
    new MinifyPlugin()
  )
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  )
}

const baseFileName = 'appyay-delivery-js'
const browserLibraryName = 'appyayDelivery'

const baseBundleConfig = {
  mode: PROD ? 'production' : 'development',
  context: path.join(__dirname, 'lib'),
  entry: __dirname + '/src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'umd',
    // library: baseFileName
  },
  module: {
    rules: []
  },
  devtool: PROD ? false : 'source-map',
  plugins,
  node: {
    os: 'empty'
  },
  // Show minimal information, but all errors and warnings
  // Except for log generation which have to contain all information
  stats: process.env.WEBPACK_MODE === 'log' ? 'verbose' : 'normal'
}

const defaultBabelLoader = {
  test: /\.js?$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {}
}

// Browsers
const browserBundle = clone(baseBundleConfig)
browserBundle.module.rules = [
  Object.assign({}, defaultBabelLoader, {
    options: Object.assign({}, defaultBabelLoader.options, {
      envName: 'browser'
    })
  })
]
browserBundle.output.library = browserLibraryName;
browserBundle.output.filename = `${baseFileName}.browser${PROD ? '.min' : ''}.js`


// Node
const nodeBundle = clone(baseBundleConfig)
nodeBundle.module.rules = [
  Object.assign({}, defaultBabelLoader, {
    options: Object.assign({}, defaultBabelLoader.options, {
      envName: 'node'
    })
  })
]
nodeBundle.target = 'node'
nodeBundle.output.libraryTarget = 'commonjs2'
nodeBundle.output.library = baseFileName;
nodeBundle.output.filename = `${baseFileName}.node${PROD ? '.min' : ''}.js`
delete nodeBundle.node

module.exports = [
  browserBundle,
  nodeBundle
]


// const webpack = require('webpack');
// const path = require('path');
// const env = require('yargs').argv.env; // use --env with webpack 2
// const pkg = require('./package.json');

// let libraryName = pkg.name;
// let globalName = 'appyayDelivery';

// let outputFile, mode;

//    mode = 'development';


// const serverConfig = {
//   mode: mode,
//   entry: __dirname + '/src/index.js',
//   devtool: 'inline-source-map',
  
//   module: {
//     rules: [
//       {
//         test: /(\.jsx|\.js)$/,
//         loader: 'babel-loader',
//         exclude: /(node_modules|bower_components)/
//       },
//       {
//         test: /(\.jsx|\.js)$/,
//         loader: 'eslint-loader',
//         exclude: /node_modules/
//       }
//     ]
//   },
//   resolve: {
//     modules: [path.resolve('./node_modules'), path.resolve('./src')],
//     extensions: ['.json', '.js']
//   }
// };

// serverConfig.target = 'node';
// serverConfig.output =  {
//   path: __dirname + '/lib',
//   library: libraryName,
//   libraryTarget: 'umd',
//   umdNamedDefine: true,
//   globalObject: "typeof self !== 'undefined' ? self : this"
// }
// serverConfig.output.filename = libraryName + '.js';
// serverConfig.externals = {
//   "fs": "commonjs fs"
// }
// // serverConfig.node = {
// //   fs: 'empty',
// //   net: 'empty'
// // };

// let clientConfig = {
//   mode: mode,
//   entry: __dirname + '/src/index.js',
//   devtool: 'inline-source-map',
  
//   module: {
//     rules: [
//       {
//         test: /(\.jsx|\.js)$/,
//         loader: 'babel-loader',
//         exclude: /(node_modules|bower_components)/
//       },
//       {
//         test: /(\.jsx|\.js)$/,
//         loader: 'eslint-loader',
//         exclude: /node_modules/
//       }
//     ]
//   },
//   resolve: {
//     modules: [path.resolve('./node_modules'), path.resolve('./src')],
//     extensions: ['.json', '.js']
//   }
// };
// clientConfig.target = 'web';
// clientConfig.output =  {
//   path: __dirname + '/lib',
//   library: globalName,
//   libraryTarget: 'umd',
//   umdNamedDefine: true,
//   globalObject: "typeof self !== 'undefined' ? self : this"
// };
// clientConfig.output.filename = libraryName + '.browser.js';
// clientConfig.plugins = [
//       new webpack.DefinePlugin({
//         'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
//       })
//     ];



// module.exports = [ clientConfig, serverConfig];





//module.exports = config;

// const webpack = require('webpack');
// const path = require('path');
// const env = require('yargs').argv.env; // use --env with webpack 2
// const pkg = require('./package.json');

// let libraryName = pkg.name;
// let globalName = 'appyayDelivery';

// let outputFile, mode;

// if (env === 'build') {
//   mode = 'production';
//   outputFile = libraryName + '.min.js';
// } else {
//   mode = 'development';
//   outputFile = libraryName + '.js';
// }

// const config = {
//   mode: mode,
//   entry: __dirname + '/src/index.js',
//   devtool: 'inline-source-map',
//   output: {
//     path: __dirname + '/lib',
//     filename: outputFile,
//     library: globalName,
//     libraryTarget: 'umd',
//     umdNamedDefine: true,
//     globalObject: "typeof self !== 'undefined' ? self : this"
//   },
//   module: {
//     rules: [
//       {
//         test: /(\.jsx|\.js)$/,
//         loader: 'babel-loader',
//         exclude: /(node_modules|bower_components)/
//       },
//       {
//         test: /(\.jsx|\.js)$/,
//         loader: 'eslint-loader',
//         exclude: /node_modules/
//       }
//     ]
//   },
//   resolve: {
//     modules: [path.resolve('./node_modules'), path.resolve('./src')],
//     extensions: ['.json', '.js']
//   },
//   // externals: {
//   //   'appyay-delivery': 'appyayDelivery'
//   // }, 
//   target: 'node',
//   // node: { 
//   //   process: false,
//   //   fs: 'empty'
//   //  },
//   // plugins: [
//   //   new webpack.DefinePlugin({
//   //     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
//   //     'global': {}
//   //   })
//   // ]
// };

//module.exports = config;


// const webpack = require('webpack');
// const path = require('path');
// const env = require('yargs').argv.env; // use --env with webpack 2
// const pkg = require('./package.json');

// let libraryName = pkg.name;
// let globalName = 'appyayDelivery';

// let outputFile, mode;

// if (env === 'build') {
//   mode = 'production';
//   outputFile = libraryName + '.min.js';
// } else {
//   mode = 'development';
//   outputFile = libraryName + '.js';
// }

// const config = {
//   mode: mode,
//   entry: __dirname + '/src/index.js',
//   devtool: 'inline-source-map',
//   output: {
//     path: __dirname + '/lib',
//     filename: outputFile,
//     library: globalName,
//     libraryTarget: 'umd',
//     umdNamedDefine: true,
//     globalObject: "typeof self !== 'undefined' ? self : this"
//   },
//   module: {
//     rules: [
//       {
//         test: /(\.jsx|\.js)$/,
//         loader: 'babel-loader',
//         exclude: /(node_modules|bower_components)/
//       },
//       {
//         test: /(\.jsx|\.js)$/,
//         loader: 'eslint-loader',
//         exclude: /node_modules/
//       }
//     ]
//   },
//   resolve: {
//     modules: [path.resolve('./node_modules'), path.resolve('./src')],
//     extensions: ['.json', '.js']
//   },
//   externals: {
//     'appyay-delivery': 'appyayDelivery'
//   }, 
//   target: 'node',
//   node: { 
//     process: false,
//     fs: 'empty'
//    },
//   plugins: [
//     new webpack.DefinePlugin({
//       'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
//       'global': {}
//     })
//   ]
// };

// module.exports = config;
