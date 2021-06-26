const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../config/index')
const getEstimatedValues = require('../helpers/getEstimatedValues')

module.exports = {
	async login(req, res) {
		const candidate = await User.findOne({name: req.body.name})
		if(candidate) {
			const isSame = await bcrypt.compare(req.body.password, candidate.password)

			if(isSame) {
				const token = jwt.sign({
					name: candidate.name,
					userId: candidate._id,
				}, config.SECRET_KEY, {expiresIn: config.EXPIRES_IN})

				let values = await getEstimatedValues(candidate._id)
				if(values) {
					candidate.estimatedSuccessTime = values.estimatedSuccessTime
					candidate.estimatedSuccessTasks = values.estimatedSuccessTasks
					await candidate.save()
				}

				res.status(200).json({token: `Bearer ${token}`, user: candidate})
			} else {
				res.status(401).json({
					message: ['Неправильно указан пароль']
				})
			}
		} else {
			res.status(404).json({
				message: ['Пользователя с таким именем не существует']
			})
		}
	},
	async register(req, res) {
		const candidate = await User.findOne({name: req.body.name})
		if(candidate) {
			res.status(422).json({
				message: ['Такое имя уже занято']
			})
		} else {
			const hashPassword = await bcrypt.hash(req.body.password, 9)
			const user = new User({
				name: req.body.name,
				password: hashPassword,
				avatar: req.file ? req.file.path : 'images//avatar.png',
				subscribes: []
			})
			try {
				await user.save()
				res.status(201).json(user)
			} catch(e) {
				console.log(e)
			}
		}
	},
	async getUser(req, res) {
		try {
			const token = req.headers.authorization.split(' ')[1]
			if(!token) {
				res.status(403).json({
					errors: ['You are not authorized']
				})
			}
			const decodedToken = jwt.verify(token, config.SECRET_KEY)
			const user = await User.findById(decodedToken.userId)
			res.status(200).json(user)
		} catch(e) {
			console.log(e)
			res.status(403).json({
				errors: ['You are not authorized']
			})
		}
	},
}