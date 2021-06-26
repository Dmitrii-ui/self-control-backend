module.exports = function(req, res, next) {
	if(req.body.name === '') {
		res.status(500).json({message: ['Имя не может быит пустым']})
	} 
	if(req.body.password.length < 6) {
		res.status(500).json({message: ['Пароль не может быть меньше 6 символов']})
	} 

	next()
}