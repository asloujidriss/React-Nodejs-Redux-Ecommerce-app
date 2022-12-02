const { isValidObjectId } = require("mongoose");
const OrderModel = require("../models/Order_Model")
const ClientModel = require("../models/Client_Model")
const ProductModel = require("../models/Product_Model");
const mongoose = require("mongoose")


module.exports = {

    create: async function(req, res) {

        const order = OrderModel(req.body)
         await  order.save(req.body,async function(err, order) {
            if (err) {
                res.status(406).json({ success: false, message: "Fialed added order", data: null })
            } else {
                ClientModel.findByIdAndUpdate(req.body.client, 
                   {$push:{orders:order}},()=>{

                       res.status(201).json({ success: true, message: "order added successufly", data: order })
                   })
             
            }
        })
    },

    getallorders: function(req, res) {
        OrderModel.find({}).populate("client").exec((err, items)=>{
            if (err) {
                res.status(404).json({ success: false, message: "Fialed to got orders", data: null })
            } else {
                res.status(201).json({ success: true, message: "List of orders", data: items })
            }

        })

    },
    getorder_byId: function(req, res) {
        OrderModel.findById(req.params.id).populate("client").populate({path:"products.product"}).exec(function(err, item) {
            if (err) {
                res.status(404).json({ success: false, message: "Fialed to got order by this id" + err, data: null })
            } else {
                res.status(201).json({ success: true, message: "order by Id", data: item })

            }

        })
    },
    
    getorder_byName: function(req, res, next) {
        OrderModel.find({ ref: req.query.ref }, function(err, items) {
            if (err) {
                res.status(404).json({ success: false, message: "failed", data: null })
            } else {
                res.status(201).json({ success: true, message: "success got order by Name", data: items })
            }
        })
    },
    update_order: function(req, res) {
        OrderModel.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, item) {
            if (err) {
                res.status(404).json({ success: false, message: "Fialed to updated order", data: null })
            } else {
                res.status(200).json({ success: true, message: "order updated successufly", data: item })
            }
        })

    },
    Delete_order: function(req, res) {
        OrderModel.findByIdAndDelete(req.params.id, function(err, item) {
            if (err) {
                res.status(404).json({ success: false, message: "Fialed deleted order", data: null })
            } else {
                res.status(201).json({ success: true, message: "order deleted successufly", data: item })
            }
        })
    },
    getmyorder:(req,res)=>{
        OrderModel.find({client:mongoose.Types.ObjectId(req.params.id)},(err,item)=>{
            if(err){
                res.status(404).json({ success: false, message: "get order by id client", data: null})  
            }else{
                res.status(201).json({ success: true, message: "order by id client", data: item }) 
            }
        })

    },

    Income: async(req,res)=>{

        const date = new Date()
        const lastYear =  new Date(date.setFullYear(date.getFullYear() -1))
        try { 
            const data =  await OrderModel.aggregate([
              
              {$match   :{ createdAt: {$gte: lastYear}}},
              {$project :{ month: {$month:"$createdAt"}, sales:"$priceTotal"}},
              {$group   :{ _id:"$month", total:{$sum:"$sales"}}} 
            ])
          
      const NewData = data.sort((a,b)=> a._id < b._id ? -1 : 1)

          res.status(200).json({message:"Income By Month", data:NewData})

        } catch (error) {
           res.status(500).json(error)
        }








    } 

  
}