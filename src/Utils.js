var multer = require('multer');

module.exports = class Utils {
    constructor(){
    }

    multerConfig (){
        return multer.diskStorage({
            destination: function(req, file, next){
                next(null, 'public/uploads/');
            }, 
            filename: (req, file, cb) => {
                cb(null, Date.now() + '.txt')
            }, 
            fileFilter: function(req, file, cb){
                if (!file.originalname.match(/\.(txt)$/)) {
                    return cb(new Error("Only text(.txt) file is allowed!"), false);
                }
                return cb(false, {status: true, message: "Uploaded file is valid!"});
            }    
        });    
    }
}