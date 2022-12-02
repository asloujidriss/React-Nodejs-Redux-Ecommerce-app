const route = require("express").Router()

const clientController = require("../controllers/Client_Controller")



const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin}= require("../middlewares/authentification")


const upload = require("../middlewares/uploadFile")
route.post("/create",upload.single("photo"), clientController.create)
route.get('/verify-now/:verificationcode', clientController.VerifyMail);
route.get("/getAll",clientController.getAll)
route.get("/getbyId/:id",clientController.getById)
route.get("/getbyName", clientController.getByName)
route.get("/stats",clientController.getstats)
route.put("/update/:id",upload.single("photo"),clientController.updateProfile)
route.delete("/delete/:id",clientController.delete)
route.delete("/delete",clientController.alldelete)
module.exports = route