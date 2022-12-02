const multer = require('multer');
const path = require('path');
const createError = require('../errors/create-errors');

const VALID_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, cb) => {
    if(!VALID_FILE_TYPES.includes(file.mimetype)){
        cb(createError("Ese tipo de archivo no es valido. "));
    } else {
        cb(null, true);
    }
};

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/uploads"))
    }
});

const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;