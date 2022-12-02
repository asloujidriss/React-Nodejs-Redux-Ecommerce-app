const express = require("express")
const route = express.Router()


const Calendarcontroller = require("../controllers/Calendar_conroller")
route.post("/create",Calendarcontroller.create)
route.get("/getall",Calendarcontroller.getall)
route.put("/update/:id", Calendarcontroller.update)
route.get("/getOne/:id", Calendarcontroller.getbyId)
route.delete("/delete/:id", Calendarcontroller.delete)


module.exports = route