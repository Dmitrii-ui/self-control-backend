const User = require('../models/User')

module.exports = {
	async getProfileById(req, res) {
		try {
			const user = await User.findById(req.params.id)
				.select('_id name avatar estimatedSuccessTasks estimatedSuccessTime')
			res.status(200).json({success: true, user: user})
		} catch(e) {
			console.log(e)
			res.status(500).json({message: ['Something went wrong']})
		}
	},
	async getAll(req, res) {
		if(req.body.name) {
			try {
				const user = await User.findOne({name: req.body.name})
					.select('name avatar estimatedSuccessTasks estimatedSuccessTime _id')
				res.status(200).json({success: true, user: user})
				return
			} catch(e) {
				res.status(500).json({message: [`Пользователя с таким именем ${req.body.name} не существует`]})
				return 
			}
		}
		try {
			const users = await User
				.find({name: {$ne: req.user.name}})
				.skip(+req.body.offset)
				.limit(+req.body.limit)
				.select('name avatar estimatedSuccessTasks estimatedSuccessTime _id')
			
			const count = await User.count({}, (err, count) => {
				return count
			})

			res.status(200).json({success: true, users: users, count: count})
		} catch(e) {
			console.log(e)
			res.status(500).json({message: ['Something went wrong']})
		}
	},
}