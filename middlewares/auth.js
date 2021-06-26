const jwt = require('jsonwebtoken')
const config = require('../config/index')
const User = require('../models/User')

module.exports = async function(req, res, next) {
	if(req.method === 'OPTIONS') {
		return next()
	}

	try {
		const token = req.headers.authorization.split(' ')[1]
		if(!token) {
			res.status(403).json({
				errors: ['You are not authorized']
			})
		}
		const decodedToken = jwt.verify(token, config.SECRET_KEY)
		req.user = await User.findById(decodedToken.userId)
		return next()
	} catch(e) {
		console.log(e)
		res.status(403).json({
			errors: ['You are not authorized']
		})
	}
}