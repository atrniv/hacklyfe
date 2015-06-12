var webpack = require('webpack');
var ProgressPlugin = require('webpack/lib/ProgressPlugin');
var _ = require('lodash');
var path = require('path');

var config = {
  context: absPath("src/app"),
  entry: {
    user: 'user/index',
    admin: 'admin/index',
    register: 'register/index'
  },
  output: {
    path: 'src/public/lib',
    filename: '[name].js',
    devtoolModuleFilenameTemplate: "[resource-path]"
  },
  module: {
    noParse: [],
    loaders: [
      { test: /\.json$/, loader: "json" },
      { test: /\.coffee$/, loader: "coffee" },
      { test: /\.html$/, loader: "raw" }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("common.js"),
    // new webpack.optimize.AggressiveMergingPlugin()
  ],
  resolve: {
    modulesDirectories: ['./src/app', 'node_modules'],
    extensions: ['', '.js', '.coffee'],
    alias: {}
  },
  resolveLoader: {
    alias: {
      'cs': 'coffee-loader',
      'text': 'raw-loader'
    }
  },
  progress: true
};

function makeArray(value) {
  if (!_.isArray(value)) { // not array
    value = [value];
  }
  return value;
}

// src: how webpack prints progress
var chars = 0, lastState, lastStateTime;
config.plugins.push(new ProgressPlugin(function(percentage, msg) {
  var state = msg;
  if(percentage < 1) {
    percentage = Math.floor(percentage * 100);
    msg = percentage + "% " + msg;
    if(percentage < 100) {
      msg = " " + msg;
    }
    if(percentage < 10) {
      msg = " " + msg;
    }
  }
  goToLineStart(msg);
  process.stderr.write(msg);
}));
function goToLineStart(nextMessage) {
  var str = "";
  for(; chars > nextMessage.length; chars--) {
    str += "\b \b";
  }
  chars = nextMessage.length;
  for(var i = 0; i < chars; i++) {
    str += "\b";
  }
  if(str) process.stderr.write(str);
}

function addLibs(libs) {
  for(var alias in libs) {
    var opts = libs[alias];
    addLib(alias, opts);
  }

  function addLib(alias, opts) {
    config.resolve.alias[alias] = opts.path;
    if (opts.imports || opts.exports || opts.expose || opts.loaders) {
      var loader = {test: opts.path, loaders: []};
      // NOTE: here order of expose, imports, exports matter
      // the order should be `expose` then `imports` then `exports`
      if(opts.expose) {
        _.forEach(makeArray(opts.expose), function (value) {
          loader.loaders.push('expose?' + value);
        });
      }
      if(opts.imports){loader.loaders.push('imports?' + makeArray(opts.imports));}
      if(opts.exports){loader.loaders.push('exports?' + makeArray(opts.exports));}
      config.module.loaders.push(loader);
      // other loaders if passed
      if(opts.loaders){
        _.forEach(makeArray(opts.loaders), function (loader) {
          config.module.loaders.push(loader);
        });
      }
    }
    if(opts.noParse) {
      config.module.noParse.push(opts.path);
    }
  }
}

function absPath(_path) {
  return path.join(__dirname, _path);
}

addLibs({
  jquery: {path: absPath('node_modules/jquery/dist/jquery.js'), expose: ['window.jQuery', 'window.$']},
  "angular": {path: absPath("node_modules/angular/index.js"), expose: "window.angular", imports: ['jquery']},

  "codemirror": {path: absPath("src/public/components/codemirror/lib/codemirror.js"), expose: ['window.CodeMirror'] },
  "codemirror_js": {path: absPath("src/public/components/codemirror/mode/javascript/javascript.js")},
  "angular-ui-codemirror": {path: absPath("src/public/components/angular-ui-codemirror/ui-codemirror.js"), exports: ["'ui.codemirror'"], imports: ['codemirror_js'] },
});

// console.log(JSON.stringify(config, 2, 2))

module.exports = config;
