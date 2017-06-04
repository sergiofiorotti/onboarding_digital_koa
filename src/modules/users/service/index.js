const mongoose = require('mongoose')
const Users = mongoose.model('User')
const common = require('../../common/service')
const R = require('ramda')



const getByEmail = email => Users.findOne(email)
const getBySystemRole = systemRole => Users.findOne()
const getByCompany = company => Users.find({ company: company }).lean()

const getById = R.curry(common.getById)



module.exports = {
    getByEmail,
    getById: getById(Users),
    getByCompany: getByCompany,
}