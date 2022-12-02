const mongoose = require("mongoose")


const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    // image: {
    //     type: String,
    //     trim: true,
    //     required: true
    // },
    subCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategories"
    }]




}, { timestamps: true })

module.exports = mongoose.model("Categories", CategorySchema)