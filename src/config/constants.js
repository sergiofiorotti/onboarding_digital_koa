const host = process.env.SMTP_HOST || 'smtp.zoho.com'
const port = process.env.SMTP_PORT || 465
const secure = process.env.SMTP_SSL || true
const user = process.SMTP_USER || 'infra@xapps.com.br'
const pass = process.SMTP_PASS || '9ephtEto'
const smtpConfig = {
	host,
	port,
	secure,
	auth: {
		user,
		pass,
	},
}

const web = 'http://localhost:4200/#/'
const api = 'http://localhost:3000/api/'

// const web = 'http://40.121.204.83:8080/#/'
// const api = 'http://13.90.83.125:3000/api/'

module.exports = {
	smtpConfig,
	web,
	api,
}
