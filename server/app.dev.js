// Serve hot-reloading bundle to client
import config from "../webpack.config";
import chokidar from 'chokidar';
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import fs from "fs"

module.exports = (options) => {

  const {app, compiler} = options;

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true, publicPath: config.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));


  // Do "hot-reloading" of express stuff on the server
  // Throw away cached modules and re-require next time
  // Ensure there's no important state in there!
  const watcher = chokidar.watch('./server');

  watcher.on('ready', function() {
    watcher.on('all', function() {
      console.log("Clearing /server/ module cache from server");
      Object.keys(require.cache).forEach(function(id) {
        if (/[\/\\]server[\/\\]/.test(id)) {
          console.log(id);
          delete require.cache[id];
        }
      });
    });
  });

  // Do "hot-reloading" of react stuff on the server
  // Throw away the cached client modules and let them be re-required next time
  compiler.plugin('done', function() {
    console.log("Clearing /client/ module cache from server");
    Object.keys(require.cache).forEach(function(id) {
      if (/[\/\\]client[\/\\]/.test(id)) delete require.cache[id];
    });
  });

  // Anything else gets passed to the client app's server rendering
  app.get('*', function(req, res, next) {
    return res.send(fs.readFileSync(__dirname + '/../public/index.html', 'utf8'))
  })
};