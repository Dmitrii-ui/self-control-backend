const Day = require('../models/Day')
const checkFormat = require('../helpers/checkFormat')
const getEstimatedValues = require('../helpers/getEstimatedValues')

module.exports = {
	async create(req, res) {
		try {
			let day = await Day.findOne({date: req.body.date, userId: req.user._id})
			const task = {
				mode: req.body.mode,
				makeTime: 0,
				name: req.body.name,
			}
			req.body.maxTime ? task.maxTime = req.body.maxTime : null
			if(day) {
				if(day.isEnd) {
					res.status(500).json({message: ["Time's up"]})
					return
				}
				
				day.tasks.push(task)
				day.totalTasks++
				await day.save()
				res.status(201).json({success: true, tasks: day.tasks})
			} else {
				if(req.body.time > req.user.dayEnd) {
					res.status(500).json({message: "Time's up"})
					return
				}
				// дня нет, это первая задача. Нужно создать День
				const dayConfig = {
					userId: req.user._id,
					tasks: [task],
					date: req.body.date
				}
				day = new Day(dayConfig)
				await day.save()
				res.status(201).json({success: true, day: day})
			}
		} catch(e) {
			console.log(e)
			res.status(500).json({message: ['Something was wrong']})
		}
	},
	async getAll(req, res) {
		try {
			const day = await Day.findOne({date: req.query.date, userId: req.user._id})
			if(day) {
				res.status(200).json({success: true, day: day})
			} else {
				res.status(404).json({message: ['There is no day-tasks of this date']})
			}
		} catch(e) {
			console.log(e)
			res.status(500).json({message: ['Something was wrong']})
		}
	},
	async update(req, res) {
		try {
			const day = await Day.findOne({date: req.body.date, userId: req.user._id})
			if(day) {
				if(day.isEnd) {
					console.log('Time\'s up!')
					res.status(500).json({message: ['Time\'s up!']})
				}
				const idx = day.tasks.findIndex((task) => task._id.toString() === req.params.id.toString())
				const setChanges = {...req.body}
				delete setChanges['date']
				let task = Object.assign(day.tasks[idx], setChanges)
				day.tasks[idx].settedTime = task.makeTime
				day.successTime += task.makeTime - day.tasks[idx].settedTime
				day.totalTime += task.makeTime - day.tasks[idx].settedTime
				day.successTasks++
				await day.save()
				res.status(200).json({success: true, day: day})
			} else {
				res.status(500).json({message: 'There is no date'})
			}
		} catch(e) {
			console.log(e)
			res.status(500).json({message: ['Something went wrong']})
		}
	},
	async updateAll(req, res) {
		try {
			const day = await Day.findOne({date: req.body.date, userId: req.user._id})
			if(day) {
				if(day.isEnd) {
					console.log('Time\'s up!')
					res.status(500).json({message: ['Time\'s up!']})
					return
				}
				req.body.tasks.forEach((task, idx) => {
					if(task._id.toString() === day.tasks[idx]._id.toString()) {
						Object.assign(day.tasks[idx], task)
						day.totalTime = day.totalTime + task.makeTime - day.tasks[idx].settedTime
						task.mode === 'positive' 
						? day.successTime += task.makeTime - day.tasks[idx].settedTime 
						: day.failureTime += task.makeTime - day.tasks[idx].settedTime
						day.tasks[idx].settedTime = task.makeTime
						if(req.body.time > req.user.dayEnd && req.body.date >= day.date) {
							day.isEnd = true
							if(task.mode === 'negative') {
								if(task.makeTime < task.maxTime) {
									day.successTasks++
									day.tasks[idx].isDone = true
								} else {
									day.failureTasks++
								}
							}
						}
					}
				})
				await day.save()
				res.status(200).json({success: true, day: day})
			} else {
				res.status(500).json({message: 'There is no day in this date'})
			}
		} catch(e) {
			console.log(e)
			res.status(500).json({message: ['Something went wrong']})
		}
	}
}




// 