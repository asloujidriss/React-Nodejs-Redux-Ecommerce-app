
// const multer = require("multer")



// const Storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './storages')
//     },
//     filename: function(req, file, cb) {
//          const images = Date.now() + '-' + file.originalname
//           cb(null,file.fieldname + Date.now() + images)
//          //(cb(null, new Date.now().toISOString().replace(/:/g, '-') + file.originalname)
//     }
// })

// const upload = multer({

//     storage: Storage,
//     limits: { _fileSize: 1024 * 1024 * 1024 * 10 },

//      fileFilter: function(req, file, cb) {
         
//         if (file.mimetype === "image/jpg" ||
//             file.mimetype === "image/jpeg" ||
//             file.mimetype === "image/png" ||
//             file.mimetype === "image/jfif" ||
//             file.mimetype === "video/mp4" ||
//             "application/pdf") {

//             cb(null, true)

//         } else {
//             cb(new Error("Image uploaded is not of type jpg/jpeg/png or jfif.....", false))
//         }
//     }

// })

// module.exports = upload



const multer = require('multer')
const path = require('path')


// 8. Upload Image Controller

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'storages')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif|pdf/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
})



module.exports = upload