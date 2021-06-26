const checkTime = require('../helpers/checkTime')
const bcrypt = require('bcryptjs')
const config = require('../config/index')
const toNumberFormat = require('../helpers/toNumberFormat')

module.exports = async function(req, res, next) {
	if(!checkTime(req.body.dayEnd) && req.body.dayEnd !== '') {
		res.status(500).json({message: ['Окончание дня должно быть в формате - hh:mm:ss']})
		return
	}
	
	if(req.body.name.length <= 2 && req.body.name !== req.user.name) {
		res.status(500).json({message: ['Имя не может быть меньше трех символов']})
		return
	}

	if(req.body.newPassword.length <= 6 && req.body.newPassword !== '') {
		res.status(500).json({message: ['Пароль не может быть меньше семи символов']})
		return
	}
	
	const isSame = await bcrypt.compare(req.body.password, req.user.password)
	
	if(!isSame && req.body.newPassword.length > 0) {
		res.status(500).json({message: ['Пароль не совпадает с текущим']})
		return
	}


	if(req.body.newPassword.length > 0) {
		req.body.password = await bcrypt.hash(req.body.newPassword, 9)
		delete req.body.newPassword
	} else {
		delete req.body.password
		delete req.body.newPassword
	}
	if(req.body.dayEnd !== '') {
		req.body.dayEnd = toNumberFormat(req.body.dayEnd)
	} else {
		delete req.body.dayEnd
	}

	if(req.body.avatar === '') {
		delete req.body.avatar
	}

	next()
}