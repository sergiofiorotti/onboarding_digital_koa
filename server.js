/* MODULE DEPENDENCIES */
require('./src/config/mongoose')()
const corsError = require('koa-cors-error')
const api = require('./src/config/api')
const bodyParser = require('koa-body')
const mount = require('koa-mount')
const gzip = require('koa-gzip')
const cors = require('koa-cors')
const http = require('http')
const koa = require('koa')
const db = require('./db')

const server = module.exports = new koa()

/* PUBLIC ROUTES */
const userRouter = require('./src/modules/users/routers/users.router')

/* MIDDLEWARES */
server.use(corsError)
server.use(bodyParser())
server.use(gzip())
server.use(cors({
	origin: '*',
	methods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
	headers: ['Content-Type', 'Authorization'],
}))

/* PUBLIC ROUTES */
server.use(mount('/api', userRouter.routes()))

/* START SERVER */
db.connection.on('connected', () => {
	http.createServer(server.callback()).listen(api.port, () => {
		console.log(`Server listening at http://localhost:${api.port}/api/`)
	})
})