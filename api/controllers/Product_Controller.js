
const ProductModel = require("../models/Product_Model");
const mongoose = require("mongoose")
const SubCategoryModel = require("../models/SubCategory_Model");

module.exports = {
    create: function(req, res, next) {

         req.body["image"]=req.files.length <= 0 ? [] : req.files.map(function(file) {
                return { name: file.filename, description: "add prod" };
            });

        const product = new ProductModel(req.body);
        product.save(req.body, function(err, product) {
            if (err) {
                res.status(406).json({ status: 406, message: err.message, data: null });
            } else {
                SubCategoryModel.findByIdAndUpdate(
                req.body.SubCategory,
                    { $push: { products: product } },
                    function(err, item) {
                        product.populate(["SubCategory", "orders"], function(err, item) {
                            res.status(201).json({
                                status: 201,
                                message: "Product added successfly",
                                data: item,
                            });
                        });
                    }
                );
            }
        });
    },

    update: function(req, res, next) {
        req.body["galleries"] =
            req.files.length <= 0 ? [] :
            req.files.map(function(file) {
                return { name: file.filename, description: "add prod" };
            });
        ProductModel.findByIdAndUpdate(
            req.params.id,
            req.body
                , { new: true },
            function(err, item) {
                if (err) {
                    res.status(404).json({ status: 404, message: "err update", data: null });
                } else {
                    res.status(200).json({
                        status: 200,
                        message: "product updated successfuly",
                        data: item,
                    });
                }
            }
        );
    },

    getAllProduct: function(req, res, next) {
        
        ProductModel.find(function(err, items) {
            if (err) {
                res.status(404).json({
                    status: 404,
                    message: "failed  to get all products",
                    data: null,
                });
            } else {
                res
                    .status(201)
                    .json({ status: 201, message: "List of all products", data: items });
            }
        });
    },
    getproductbyname: function(req, res, next) {
        ProductModel.find({ refProduct: req.query.refProduct },
            function(err, items) {
                if (err) {
                    res.status(404).json({ status: 404, message: "product not founded ", data: null });
                } else {
                    res.status(200).json({ status: 200, message: "list of products", data: items });
                }
            }
        );
    },
    getproductbyId: function(req, res, next) {
        ProductModel.findById(req.params.id).populate({
            path: 'SubCategory',
            populate: {
              path: 'products',
            },
          }).exec(function(err, item) {
                        if (err) {
                
                res.status(406).json({
                    status: 406,
                    message: "cannot get product by this id"+err,
                    data: null,
                });
            } else {
                res
                    .status(200)
                    .json({ status: 200, message: "product find", data: item });
            }
        })
    },

    deleteproduct:async(req, res)=> {
           
        try {
            const product = await ProductModel.findById({ _id: req.params.id });
            await SubCategoryModel.findOneAndUpdate(product.SubCategory, {
               $pull: { products: product._id },
            });
             await ProductModel.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: 'product deleted'});
         } catch (error) {
            res.status(400).json({
               message: error.message,
            });
         }
    },
   
};