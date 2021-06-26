const {Schema, model} = require('mongoose')
const getDate = require('../helpers/getDate')

const daySchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	date: {
		type: String,
		required: true,
		default: getDate(':')
	},
	tasks: [
		{
			mode: {
				type: String,
				required: true
			},
			makeTime: {
				type: Number,
				required: true,
				default: 0
			},
			isDone: {
				type: Boolean,
				required: true,
				default: false
			},
			name: {
				type: String,
				required: true
			},
			maxTime: {
				type: Number,
				default: 0
			},
			settedTime: {
				type: Number,
				required: true,
				default: 0
			}
		}
	],
	totalTime: {
		type: Number,
		required: true,
		default: 0
	},
	totalTasks: {
		type: Number,
		required: true,
		default: 1
	},
	successTasks: {
		type: Number,
		required: true,
		default: 0
	},
	successTime: {
		type: Number,
		required: true,
		default: 0
	},
	failureTasks: {
		type: Number,
		required: true,
		default: 0
	},
	failureTime: {
		type: Number,
		required: true,
		default: 0
	},
	isEnd: {
		type: Boolean,
		required: true,
		default: false
	}
})



module.exports = model('Day', daySchema)