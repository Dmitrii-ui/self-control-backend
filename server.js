const express = require('express')
const config = require('./config')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')

const fileMiddleware = require('./middlewares/image')

const authRoutes = require('./routes/auth')
const dayRoutes = require('./routes/day')
const daysRoutes = require('./routes/days')
const profilesRoutes = require('./routes/profiles')
const settingsRoutes = require('./routes/settings')
const subscribeRoutes = require('./routes/subscribe')

const server = express()
const PORT = process.env.PORT || 3000
server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))
server.use(express.urlencoded({extended: true}))
server.use(cors())
server.use(helmet())
server.use(fileMiddleware.single('avatar'))
server.use(require('morgan')('dev'))
server.use(require('cors')())
server.use('/images', express.static('images'))

server.use('/api/auth', authRoutes)
server.use('/api/day', dayRoutes)
server.use('/api/days', daysRoutes)
server.use('/api/profiles', profilesRoutes)
server.use('/api/settings', settingsRoutes)
server.use('/api/subscribe', subscribeRoutes)

async function start() {
	try {
		await mongoose.connect(
			config.MONGO_URI,
			{
				useUnifiedTopology: true,
				useNewUrlParser: true,
				useFindAndModify: false
			}
		)
		server.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}...`)
		})
	} catch(e) {
		console.log(e)
	}
}

start()