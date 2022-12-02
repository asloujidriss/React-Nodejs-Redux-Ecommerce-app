const mongoose = require("mongoose")
const UserModel = require("./User_Model")


const adminSchema = new mongoose.Schema({

    role:{
        type:String,
        enum:["Admin","SuperAdmin"],
        default:"Admin"
    }
})

const admins = UserModel.discriminator("admins", adminSchema)

module.exports = mongoose.model("admins")