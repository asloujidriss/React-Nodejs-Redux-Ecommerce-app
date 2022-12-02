const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GallerySchema = new Schema({
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
});
const ProductSchema = new Schema({
    refProduct: {
        type: String,
        trim: true,
        required: [true, "please enter a refProduct"],
    },
    price: {
        type: String,
        required: [true, "please enter a price"],
        trim: true,
        
    },
    qte: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    SubCategory: {
        type: Schema.Types.ObjectId,
        ref: "SubCategories",
    },
    image: [GallerySchema],
    
    orders: {
        type: Schema.Types.ObjectId,
        ref: "Orders",
    },
}, { timestamps: true });

module.exports = mongoose.model("Products", ProductSchema);