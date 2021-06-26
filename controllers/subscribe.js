const User = require('../models/User')

module.exports = {
	async getAll(req, res) {
		try {
			const subscribes = await User.findById(req.user._id)
				.populate('subscribes', '_id name avatar').exec()
			res.status(200).json({success: true, subscribes: subscribes.subscribes})
		} catch(e) {
			console.log(e)
			res.status(500).json({message: ['Something went wrong']})
		}
	},
	async subscribe(req, res) {
		try {
			req.user.subscribes.push(req.body.id)
			await req.user.save()
			res.status(201).json({success: true, userId: req.body.id})
		} catch(e) {
			console.log(e)
			res.status(500).json({message: ['Something went wrong']})
		}
	},
	async unsubscribe(req, res) {
		try {
			const idx = req.user.subscribes.findIndex((id) => id.toString() === req.params.id.toString())
			req.user.subscribes.splice(idx, 1)
			await req.user.save()
			res.status(200).json({success: true, uId: req.params.id})
		} catch(e) {
			console.log(e)
			res.status(500).json({message: ['Something went wrong']})
		}
	},
}