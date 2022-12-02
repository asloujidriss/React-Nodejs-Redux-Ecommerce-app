const express = require("express")
const route = express.Router()
const upload = require("../middlewares/uploadFile")

const categorycontroller = require("../controllers/Category_Controller")
route.post("/create",categorycontroller.create)
route.get("/categories",categorycontroller.getallcategories)
route.put("/category/:id",upload.single("photo"), categorycontroller.updatecategory)
route.get("/categorybyname", categorycontroller.getcategorybyname)
route.get("/category/:id", categorycontroller.getgategorybyId)
route.delete("/delete/:id", categorycontroller.deletecategory)


module.exports = route