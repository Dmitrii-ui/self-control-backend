module.exports = function(date) {
	// 2021:09:24
	const regexp = /^\d\d\d\d:\d\d:\d\d$/
	return regexp.test(date)
}