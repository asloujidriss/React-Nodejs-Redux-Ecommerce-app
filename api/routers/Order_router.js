const express = require("express")

const route = express.Router()

const OrderController = require("../controllers/Order_Controller")



const verifyToken = require("../middlewares/authentification")



route.post("/create",OrderController.create)
route.get("/allorders", OrderController.getallorders)
route.get("/Order/:id", OrderController.getorder_byId)
route.get("/Orderbyclient/:id", OrderController.getmyorder)
route.get("/Orders/byName", OrderController.getorder_byName)
route.put("/Order/:id", OrderController.update_order)
route.delete("/Order/:id", OrderController.Delete_order)
route.get("/Income", OrderController.Income)

module.exports = route