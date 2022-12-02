const SubCategoryModel = require("../models/SubCategory_Model");
const ProductModel = require("../models/Product_Model");
const CategoryModel = require("../models/Category_Model");
const mongoose = require("mongoose")

module.exports = {
    create: function(req, res, next) {

        console.log("body create product", req.body)
        const subcabtegory = new SubCategoryModel(req.body);

        subcabtegory.save(req.body, function(err, subcategory) {
            if (err) {
                res.status(404).json({
                    status: 404,
                    message: "failed create subcategory",
                    data: null,
                });
            } else {
                CategoryModel.findByIdAndUpdate(
                    req.body.category,

                    { $push: { subCategories: subcategory } },
                    function(err, item) {
                        subcategory.populate(
                            [
                                { path: "products", select: "price" },
                                { path: "category", select: "name" },
                            ],
                            function() {
                                const data = {
                                    _id: subcategory._id,
                                    name: subcategory.name,
                                    description: subcategory.description,
                                    products: subcategory.products,
                                    category: subcategory.category,
                                };
                                res.status(201).json({
                                    status: 201,
                                    message: "subcategory created successfuly",
                                    data: subcategory,
                                });
                            }
                        );
                    }
                );
            }
        });
    },
    getallsubcategories: function(req, res) {
        SubCategoryModel.find({}).populate({path:"products"}).populate("category").exec(
                function(err, items) {
                    if (err) {
                        res
                            .status(404)
                            .json({ status: 404, message: "failed request", data: null });
                    } else {
                        res.status(201).json({
                            status: 201,
                            message: "list of subcategories",
                            data: items,
                        });
                    }
                })
        //     .populate([
        //         { path: "category", select: "name" },
        //         { path: "products", select: "price" },
        //     ])

        // .select("-__v")
        //     .select("-__id");

        //populate(["category","products"])


    },
    updatesubcategory: function(req, res, next) {

        SubCategoryModel.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true },
            function(err, item) {
                if (err) {
                    res.status(404).json({
                        status: 404,
                        message: "failed to updated subcategory",
                        data: null,
                    });
                } else {
                    res.status(200).json({
                        status: 200,
                        message: "subcategory updated successfuly",
                        data: item,
                    });
                }
            });


    },
    getbyId: function(req, res, next) {
        SubCategoryModel.findById(req.params.id).populate({path:"products"}).populate().exec((err, item)=> {
                if (err) {
                    res.status(404).json({
                        status: 404,
                        message: "cannot got subcategory by this Id",
                        data: null,
                    });
                } else {
                    res
                        .status(201)
                        .json({ status: 201, message: "subcategory", data: item });
                }
            })
            
    },
    getbyidcategory:async(req,res)=>{
        
            await SubCategoryModel.find({category:mongoose.Types.ObjectId(req.params.id)}).populate("category").exec((err,item)=>{
                if(err){
                    res.status(406).json({success:true,message:"failed to find this category",data:null})
                }else{
                    res.status(201).json({success:true,message:"category",data:item})
                }  
                
            }) 
           
        },
    getsubcategorybyName: async(req, res, next)=> {
      
        let {q} = req.query

        let data = await SubCategoryModel.find(
            {
              
                $or: [
                    {
                      name: { $regex: q, $options: "i" },
                    },
                   
                  ],
            }
        )


    },
    deletesubcategory: function(req, res, next) {
        SubCategoryModel.findByIdAndDelete(req.params.id, function(err, item) {
            if (err) {
                res.status(404).json({
                    status: 404,
                    message: "failed to deleted subcategory",
                    data: null,
                });
            } else {
                res.status(201).json({
                    status: 200,
                    message: "subcategory deleted successufly",
                    data: item,
                });
            }
        });
    },
    
    deleteproduct:async(req,res)=>{
        const product = await ProductModel.findById(req.params.id1)
      await SubCategoryModel.findByIdAndUpdate(req.params.id,
         {$pull: {products: product?.id}}).then(item=>{
    res.status(201).json({message:"product deleted successuflly",item})
   }).catch(err=>{
    res.status(404).json({message:"err to delete product",err})
   })
          },
    

};