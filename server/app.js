import config from '../webpack.config'
import cssModulesRequireHook from 'css-modules-require-hook'
import express from 'express'
import webpack from 'webpack'
import morgan from 'morgan'
import fs from "fs"

const inProduction = process.env.NODE_ENV === 'production'

cssModulesRequireHook({generateScopedName: '[path][name]-[local]'})
const compiler = webpack(config)
const app = express()

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'))

// Include server routes as a middleware
app.use(function(req, res, next) {
  require('./routes')(req, res, next)
})

let options = {app, compiler}
inProduction ? require('./app.live')(options) : require('./app.dev')(options)

module.exports = app