const nodemailer = require('nodemailer')
const smtpConfig = require('../config/constants').smtpConfig
const fs = require('fs')
const apiUrl = require('../config/constants').api
const webUrl = require('../config/constants').web



const getEmailSubject = (options) => {
	let subject = ''
	const type = options.emailType

	if (type === 0) subject = 'Confirme seu cadastro'
	if (type === 1) subject = 'Redefinir senha!'
	if (type === 2) subject = 'Você foi cadastrado'
	if (type === 3) subject = 'Cliente télios solícita contato para adesão de plano.'
	if (type === 4) subject = 'Télios informa, ação à vencer amanhã.'
	if (type === 5) subject = 'Télios informa, ação à vencer hoje.'
	if (type === 6) subject = 'Télios informa, ação vencida.'
	if (type === 7) subject = 'Télios informa, ação vencida.'
	if (type === 8) subject = 'Télios informa, prazo para devolutiva vence hoje.'

	return subject
}

const getEmailBody = (options) => {
	let body = ''
	const type = options.emailType

	if (type === 0) {
		let template = fs.readFileSync('./src/helpers/templates/activateAccount.template.html', 'utf8')
		template = template.replace('{{subject}}', getEmailSubject(options))
		template = template.replace('{{name}}', options.user.name)
		template = template.replace('{{baseUrl}}', `${webUrl}user/activateaccount/`)
		template = template.replace('{{hash}}', options.user.hash)
		body = template
	}

	if (type === 1) {
		let template = fs.readFileSync('./src/helpers/templates/resetPassword.template.html', 'utf8')
		template = template.replace('{{subject}}', getEmailSubject(options))
		template = template.replace('{{name}}', options.user.name)
		template = template.replace('{{password}}', options.password)

		body = template
	}

	if (type === 2) {
		let template = fs.readFileSync('./src/helpers/templates/activateOtherAccount.template.html', 'utf8')
		template = template.replace('{{subject}}', getEmailSubject(options))
		template = template.replace('{{email}}', options.user.email)
		template = template.replace('{{password}}', options.user.password)
		template = template.replace('{{baseUrl}}', `${webUrl}user/activateaccount/`)
		template = template.replace('{{hash}}', options.user.hash)
		body = template
	}

	if (type === 3) {
		let template = fs.readFileSync('./src/helpers/templates/userContactTelios.template.html', 'utf8')
		template = template.replace('{{subject}}', getEmailSubject(options))
		template = template.replace('{{name}}', options.user.name)
		template = template.replace('{{name1}}', options.user.name)
		template = template.replace('{{email}}', options.user.email)
		template = template.replace('{{fone}}', options.user.fone)

		template = template.replace('{{userName}}', options.company.owner.name)
		template = template.replace('{{userEmail}}', options.company.owner.email)

		template = template.replace('{{companyName}}', options.company.name)
		template = template.replace('{{companyName1}}', options.company.name)
		template = template.replace('{{companyFone}}', options.company.phone)
		template = template.replace('{{companyPlan}}', options.company.plan.contract_type)

		body = template
	}

	if (type === 4) {
		let template = fs.readFileSync('./src/helpers/templates/delayTomorrow.template.html', 'utf8')
		template = template.replace('{{subject}}', getEmailSubject(options))
		template = template.replace('{{name}}', options.user.name)
		template = template.replace('{{description}}', options.user.description)
		body = template
	}

	if (type === 5) {
		let template = fs.readFileSync('./src/helpers/templates/delayToday.template.html', 'utf8')
		template = template.replace('{{subject}}', getEmailSubject(options))
		template = template.replace('{{name}}', options.user.name)
		template = template.replace('{{description}}', options.user.description)
		body = template
	}

	if (type === 6) {
		let template = fs.readFileSync('./src/helpers/templates/delayAlert.template.html', 'utf8')
		template = template.replace('{{subject}}', getEmailSubject(options))
		template = template.replace('{{email}}', options.user.email)
		template = template.replace('{{name}}', options.user.name)
		template = template.replace('{{days}}', options.user.atrasada)
		template = template.replace('{{nomes}}', options.user.nomes)
		template = template.replace('{{description}}', options.user.description)
		body = template
	}

	if (type === 7) {
		let template = fs.readFileSync('./src/helpers/templates/delayDaysAlert.template.html', 'utf8')
		template = template.replace('{{subject}}', getEmailSubject(options))
		template = template.replace('{{email}}', options.user.email)
		template = template.replace('{{name}}', options.user.name)
		template = template.replace('{{days}}', options.user.atraso)
		template = template.replace('{{description}}', options.user.description)
		template = template.replace('{{nomes}}', options.user.nomes)
		template = template.replace('{{nomeresponsavel}}', options.user.nomeresponsavel)
		template = template.replace('{{nomeresponsavel1}}', options.user.nomeresponsavel)
		template = template.replace('{{emailresponsavel}}', options.user.emailresponsavel)
		body = template
	}

	if (type === 8) {
		let template = fs.readFileSync('./src/helpers/templates/analysiReturnDate.template.html', 'utf8')
		template = template.replace('{{subject}}', getEmailSubject(options))
		template = template.replace('{{email}}', options.user.email)
		template = template.replace('{{name}}', options.user.name)
		template = template.replace('{{description}}', options.user.description)
		template = template.replace('{{label}}', options.user.label)
		body = template
	}

	return body
}

const sendEmail = options =>
	new Promise((resolve, reject) => {
		const transporter = nodemailer.createTransport(smtpConfig)

		const mailOptions = {
			from: smtpConfig.auth.user,
			to: (options.emailType == 3 ? 'contato@telios.eng.br' : options.user.email),
			subject: getEmailSubject(options),
			html: getEmailBody(options),
		}

		return transporter.sendMail(mailOptions, (err) => {
			if (err) return reject(err)
			return resolve('Email enviado')
		})
	})

exports.sendEmail = sendEmail
