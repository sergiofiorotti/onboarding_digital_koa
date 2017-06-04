const querystring = require('querystring');

const stringify = obj => querystring.stringify(obj)

const parse = string => querystring.parse(string, null, null)

module.exports = {
    stringify,
    parse
}