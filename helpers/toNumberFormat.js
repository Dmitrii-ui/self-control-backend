module.exports = function(str) {
	// '01:01:42' = 3702
	let data = str.split(':')
	let hours = +data[0] * 3600
	let minutes = +data[1] * 60
	let seconds = +data[2] + hours + minutes
	return seconds
}
// export default function(str) {
// 	let hours = 0
// 	let data = str.split(':')
// 	hours += Number(data[0])
// 	hours += (Number(data[1]) / 60)
// 	hours += (Number(data[2]) / 3600)
// 	return +hours.toFixed(4)
// }
