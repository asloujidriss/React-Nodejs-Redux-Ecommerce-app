 const UserModel = require("./User_Model")
 const mongoose = require("mongoose")


 const clientSchema = new mongoose.Schema({

     addressL: {
         type: String,
         required: true,
         trim: true
     },
     orders:[{
      type:mongoose.Schema.Types.ObjectId,
      ref: "Orders"
  }],
     createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },

 })

 const Clients = UserModel.discriminator("Clients", clientSchema)

 module.exports = mongoose.model("Clients")