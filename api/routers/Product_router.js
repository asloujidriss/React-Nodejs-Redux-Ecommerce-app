const express = require("express")
const productController = require("../controllers/Product_Controller")
const route = express.Router()
const upload = require("../middlewares/uploadFile")


const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin}= require("../middlewares/authentification")


route.post("/create",upload.array("photos"),productController.create)
route.get("/products",verifyToken,productController.getAllProduct)
route.put("/product/:id", upload.array("photos"), productController.update)
route.get("/products/byname", productController.getproductbyname)
route.get("/product/:id", productController.getproductbyId)
route.delete("/product/:id", productController.deleteproduct)



module.exports = route