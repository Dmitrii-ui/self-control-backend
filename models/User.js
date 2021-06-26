const {Schema, model} = require('mongoose')

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: {
		type: String,
		required: true
	},
	subscribes: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User'		
		}
	],
	dayEnd: {
		type: Number,
		required: true,
		default: 79200
	},
	estimatedSuccessTasks: {
		type: Number,
		required: true,
		default: 0
	},
	estimatedSuccessTime: {
		type: Number,
		required: true,
		default: 0
	},
})

userSchema.methods.addToFavorite = function() {
	
}

module.exports = model('User', userSchema)