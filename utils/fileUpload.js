const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/upload')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limit: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter : function (req, file, cb) {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
            cb(null, true)
        } else {
            return cb(new Error('Only.png,.jpg and.jpeg format allowed!'))

        }
    }
});

module.exports = upload