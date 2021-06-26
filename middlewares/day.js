const checkFormat = require('../helpers/checkFormat')

module.exports = function(req, res, next) {
	const isBody = req.body.date ? req.body.date : null
	if(!checkFormat(req.body.date) && isBody) {
		throw new Error('Date is not valid')
	}

	const isDate = req.query.date ? true : false
	if(!checkFormat(req.query.date) && isDate) {
		throw new Error('Date is not valid')
	}
	
	next()
}