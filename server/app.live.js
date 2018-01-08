import path from "path";
import express from "express";
import fs from "fs"

module.exports = (options) => {
  const {app} = options;
  // Serve static assets
  app.use(express.static(path.resolve(__dirname, '..', 'build')));

  // Anything else gets passed to the client app's server rendering
  app.get('*', function(req, res, next) {
    return res.send(fs.readFileSync(__dirname + '/../build/index.html', 'utf8'))
  })
};