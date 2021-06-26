module.exports = {
	async update(req, res) {
		try {
			delete req.body.avatar
			Object.assign(req.user, req.body)
			req.user.avatar = req.file ? req.file.path : req.user.avatar
			await req.user.save()
			let response = {...req.body}
			req.file ? response.avatar = req.file.path : false
			res.status(200).json({success: true, user: response})
		} catch(e) {
			console.log(e)
			res.status(500).json({message: ['Something went wrong']})
		}
	},
}