const bcrypt = require('bcryptjs')

const encrypt = password => new Promise((resolve, reject) =>
	bcrypt.genSalt(10, (err, salt) => {
		if (err) return reject(err)

		return bcrypt.hash(password, salt, (iErr, hash) => {
			if (iErr) return reject(iErr)
			return resolve(hash)
		})
	}))

const compare = (password, hash) => new Promise((resolve, reject) =>
	bcrypt.compare(password, hash, (err, result) => {
		if (err) return reject(err)
		return resolve(result)
	}))

module.exports = {
	compare,
	encrypt,
}
