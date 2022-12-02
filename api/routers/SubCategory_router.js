const express = require("express")
const subcategorycontroller = require("../controllers/SubCategory_Controller")

const route = express.Router()


route.post("/create", subcategorycontroller.create)
route.get("/subcategories", subcategorycontroller.getallsubcategories)
route.put("/subcategory/:id", subcategorycontroller.updatesubcategory)
route.get("/subcategory/:id", subcategorycontroller.getbyId)
route.get("/subcategories/byName", subcategorycontroller.getsubcategorybyName)
route.delete("/subcategory/:id", subcategorycontroller.deletesubcategory)
route.delete("/deleteproduct/:id/product/:id1", subcategorycontroller.deleteproduct)

module.exports = route