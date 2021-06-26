const Day = require('../models/Day')

module.exports = {
	async getDayById(req, res) {
		try {
			const day = await Day.findOne({userId: req.user._id, _id: req.params.id})
			// либо поиск только по ID с помощью метода FindById, так как по юзеру поиск уже был, когда отдавались все дни
			res.status(200).json({success: true, day: day})
		} catch(e) {
			console.log(e)
			res.status(500).json({message: ['Something went wrong']})
		}
	},
	async getAll(req, res) {
		if(req.body.date) {
			try {
				const day = await Day.findOne({userId: req.user._id, isEnd: true, date: req.body.date})
				res.status(200).json({success: true, day: day})
				return
			} catch(e) {
				res.status(500).json({message: [`Дня с такой датой ${req.body.date} не существует`]})
				return 
			}
		}
		try {
			const days = await Day
				.find({userId: req.user._id, isEnd: true})
				.sort({date: -1})
				.skip(+req.body.offset)
				.limit(+req.body.limit)
			
			const count = await Day.find({userId: req.user._id}).count({}, (err, count) => {
				return count
			})

			res.status(200).json({success: true, days: days, count: count})
		} catch(e) {
			console.log(e)
			res.status(500).json({message: ['Something went wrong']})
		}
	},
}