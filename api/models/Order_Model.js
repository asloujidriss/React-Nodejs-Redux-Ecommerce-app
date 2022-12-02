const mongoose = require("mongoose")



const OrderSchema = new mongoose.Schema({

    ref: {
        type: String,   
    },
    priceTotal: {
        type: Number,
        required: true,
       
    },
    QuantityTotal: {
        type: String,
        required: true,
        
    },
    date: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        
    },
    status: {
        type: String,
        enum : ['PENDDING','DELIVRED'],
        default: 'PENDDING'
    },
    
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products"
        },
        price: {
            type: String,
            
        },
        quantity: {
            type:Number,
            required: true,
           
        },
        color: {
            type: String,
            required: true,
           
        },
        size:{
            type: String,
            required: true,
            
        },
       
    }],
    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Clients"
    }
    
}, { timestamps: true })

module.exports = mongoose.model("Orders", OrderSchema)
