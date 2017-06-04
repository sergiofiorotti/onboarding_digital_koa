const mongoose = require('mongoose');
const parse = require('co-busboy');
const path = require('path');
const Vision = require('@google-cloud/vision');
// const vision = Vision();

const visionClient = Vision({
  projectId: 'xcess-ocr',
  keyFilename: path.resolve('./Xcess-OCR-3e99b18da483.json'),
});

const Users = mongoose.model('User');

const getText = function*() {
	// const fileName = '/path/to/image.png';
	const params = this.request.body
	const buffer = new Buffer(params.file)
	vision.detectText(buffer)
	.then((results) => {
		const detections = results[0];

		console.log('Text:');
		detections.forEach((text) => console.log(text));
	})
	.catch((err) => {
		console.error('ERROR:', err);
	});
};

const getUsers = function*() {
	const users = yield Users.find().lean()
	this.body = {
		data: users,
	}
	this.status = 200
};

const getUser = function*() {
	const user = yield Users.findById(this.params.id)
	this.body = {
		data: users,
	}
	this.status = 200
};

const createUser = function*() {
	const params = this.request.body
	const user = yield Users.create(params)
	this.body = {
		message: "Sucess",
		data: user
	}
	this.status = 201
};

const updateUser = function*(next) {
	const params = this.request.body
	const user = yield Users.findById({
		_id: this.params.id,
	})
	// params.updated = Date.now()

	if (!user) {
		this.status = 404
		yield next
	}

	yield Users.update({
		_id: this.params.id,
	}, params)
	this.status = 200
};

const deleteUser = function*() {
	yield Users.remove({
		_id: this.params.id,
	})
	this.status = 204
};

module.exports = {
	getText,
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
}
