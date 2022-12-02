const mongoose = require("mongoose")

const SubCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories"
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
    }],



}, { timestamps: true })
module.exports = mongoose.model("SubCategories", SubCategorySchema)