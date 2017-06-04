const mongoose = require('./src/models/base/mongoose')
const mongodb = require('./src/config/mongodb')()

module.exports = mongoose.connect(mongodb.connection.url, mongodb.options, (err) => {
	if (err) throw err
})
