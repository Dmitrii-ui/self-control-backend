module.exports = function(separator) {
	let date = new Date()
	let year = date.getFullYear() 
	let mongth =  Number(date.getMonth() + 1)
	let day = date.getDate()
	if(mongth <= 9) {
		mongth = '0' + mongth
	} 
	if(day <= 9) {
		day = '0' + day
	} 

	return year + separator + mongth + separator + day // 2021:09:24
}