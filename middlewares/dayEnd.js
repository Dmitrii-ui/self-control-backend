module.exports = function(req, res, next) {
	if(req.body.time > req.user.dayEnd) {
		res.json({message: ['Time\'s up!']})
	}

	next()
}