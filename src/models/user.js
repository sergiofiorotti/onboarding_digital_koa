// Module dependencies
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
	name: {
		type: String,
	},
	father: {
		type: String,
	},
	mother: {
		type: String,
	},
	cpf: {
		type: String,
	},
	rg: {
		type: String,
	},
	email: {
		type: String,
	},
	phone: { 
		type: String,
	},
	created: {
		type: Date,
		default: Date.now,
	},
	shippingDate: {
		type: String,
	},
	birthday: {
		type: String,
	},
	born: {
		type: String,
	},
	photos: [{
		type: String,
	}],
})

// Exports Module
mongoose.model('User', UserSchema)
