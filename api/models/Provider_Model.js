const UserModel = require("./User_Model")
const mongoose = require("mongoose")



const providerSchema = new mongoose.Schema({

    company: {

        type: String,
        required: true,
        trim: true
    }
})


const Providers = UserModel.discriminator("Providers", providerSchema)

module.exports = mongoose.model("Providers")