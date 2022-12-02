const route = require("express").Router()

const providerController = require("../controllers/Provider_Controller")


const upload = require("../middlewares/uploadFile")

route.post("/create", upload.single("photo"), providerController.create)
route.get("/getAll", providerController.getAll)
route.get("/getbyId/:id", providerController.getById)
route.get("/getbyName", providerController.getByName)
route.put("/update", providerController.update)
route.delete("/update", providerController.delete)




module.exports = route