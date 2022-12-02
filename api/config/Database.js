const mongoose = require("mongoose")
const dotenv = require("dotenv").config();
const DB = process.env.DB_URI

//mongoose.Promise = global.Promise


const Database = mongoose.connect(DB, {
        useNewUrlParser: true,
    },
    (err) => {
        if (!err) {
            console.log("MongoDB connected successfuly")
        } else {
            console.log("Failed connection with DB:" + err)
        }
    })

module.exports = Database