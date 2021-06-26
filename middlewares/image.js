const multer = require('multer')

const getDate = require('../helpers/getDate')

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'images')
	},
	filename(req, file, cb) {
		cb(null, getDate('-') + '-' + file.originalname)
	}
})

const extname = ['image/png', 'image/jpg', 'image/jpeg']

const fileFilter = (req, file, cb) => {
	if(extname.includes(file.mimetype)) {
		cb(null, true)
	} else {
		cb(null, false)
	}
}

module.exports = multer({
	storage: storage,
	fileFilter: fileFilter
})