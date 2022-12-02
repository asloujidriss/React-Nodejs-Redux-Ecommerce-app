const express = require("express")
const app = express()
const cors = require('cors')
const Database = require("./config/Database")
const dotenv = require("dotenv")
require("dotenv").config()
const PORT = process.env.PORT
const morgan = require("morgan")



 var corsOptions ={
     origin:'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cors('corsOptions'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan("tiny"))


//import router

const productRouter = require("./routers/Product_router")
const categoryRouter = require("./routers/Category_router")
const subcategoryRouter = require("./routers/SubCategory_router")
const orderRouter = require("./routers/Order_router")
const calendarRouter = require("./routers/Calendar_router")
const clientRouter = require("./routers/Client_router")
const providerRouter = require("./routers/Provider_router")
const userRouter = require("./routers/User_router")
const adminRouter = require("./routers/Admin_router")

app.use("/products", productRouter)
app.use("/categories", categoryRouter)
app.use("/subcategories", subcategoryRouter)
app.use("/orders", orderRouter)
app.use("/calendars", calendarRouter)
app.use("/clients", clientRouter)
app.use("/providers", providerRouter)
app.use("/users", userRouter)
app.use("/admins", adminRouter)


app.get("/getImage/:img",function(req, res) {
    res.sendFile(__dirname + "/storages/" + req.params.img)
})

app.listen(PORT, function(err) {
    console.log(`server running on http://localhost:${PORT}`)
})