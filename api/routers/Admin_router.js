const route = require("express").Router()

const AdminController = require("../controllers/Admin_Controller")



const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin}= require("../middlewares/authentification")




const upload = require("../middlewares/uploadFile")


route.post("/create",upload.single("photo"), AdminController.create)
route.get("/getAll",AdminController.getAll)
route.get("/getbyId/:id",AdminController.getById)
route.get("/getbyName", AdminController.getByName)
route.put("/update/:id",upload.single("photo"),AdminController.updateProfile)
route.delete("/delete/:id",AdminController.delete)

module.exports = route