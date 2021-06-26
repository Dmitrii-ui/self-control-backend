module.exports = function(str) {
	const regexp = /^([2][0-3]|[0-1][0-9]):[0-5][0-9]:[0-5][0-9]$/
	return regexp.test(str)
}