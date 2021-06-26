const Day = require('../models/Day')
const config = require('../config/index')

module.exports = async function(id) {
	try {
		const daysCount = await Day.find({userId: id, isEnd: true})
			.count({}, (err, count) => {return count})
		const days = await Day.find({userId: id, isEnd: true})
			.skip(daysCount - config.ESTIMATED_DAYS_COUNT)
			
		if(days.length > 0) {
			let estimatedSuccessTime = 0
			let estimatedSuccessTasks = 0
			let totalTasks = 0
			days.forEach(day => {
				estimatedSuccessTime += day.successTime
				estimatedSuccessTasks += day.successTasks
				totalTasks += day.totalTasks
			})
			estimatedSuccessTasks = estimatedSuccessTasks /  totalTasks
			estimatedSuccessTime = estimatedSuccessTime / days.length
			return {
				estimatedSuccessTasks: (+estimatedSuccessTasks.toFixed(2)) * 100, 
				estimatedSuccessTime: (+estimatedSuccessTime.toFixed(0))
			}
		}
		return null
		
	} catch(e) {
		return null
	}
}