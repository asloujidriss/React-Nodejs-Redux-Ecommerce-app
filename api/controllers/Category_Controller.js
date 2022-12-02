const CategoryModel = require("../models/Category_Model")


module.exports = {

    create: function(req, res, next) {

        //req.body["image"]=req.file?.filename
        const category = new CategoryModel(req.body)

        category.save(req.body, function(err, item) {
            if (err) {
                res.status(404).json({ status: 404, message: "create category failed"+err, data: null })
            } else {
                item.populate("subCategories", function() {

                    res.status(201).json({ status: 201, message: "category created successfly", data: item })
                })
            }
        })
    },
    getallcategories: function(req, res, next) {

        CategoryModel.find({}).populate({path:"subCategories"}).populate().exec(function(err, items) {
            if (err) {
                res.status(404).json({ status: 404, message: "cannot founded categories", data: null })
            } else {
                res.status(201).json({ status: 200, message: "list of categories", data: items })
            }
        })

    },
    updatecategory: function(req, res, next) {
        req.body["image"] = req.file.filename;

        CategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, item) {

            if (err) {
                res.status(404).json({ status: 404, message: "failed to updated category", data: null })
            } else {
                res.status(200).json({ status: 201, message: "category updated successufly", data: item })
            }
        })
    },
    getcategorybyname: async (req, res, next)=> {
        
     
      let {q} = req.query

        let data = await CategoryModel.find(
            {
              
                $or: [
                    {
                      name: { $regex: q, $options: "i" },
                    },
                    {
                      description: { $regex: q, $options: "i" },
                    }
                  ],
            }
        )
   

    res.status(201).json(data)
        // CategoryModel.find({ name: req.query.name }).select("-__v").exec(function(err, item) {
        //     if (err) {
        //         res.status(404).json({ status: 404, message: "cannot founded category by this name", data: null })

        //     } else {
        //         res.status(201).json({ status: 201, message: "category", data: item })
        //     }
        // })


    },
    getgategorybyId: function(req, res, next) {

        CategoryModel.findById(req.params.id, function(err, item) {
            if (err) {
                res.status(404).json({ status: 404, message: "cannot find category", data: null })
            } else {
                res.status(200).json({ status: 201, message: "category founded", data: item })
            }
        })
    },
    deletecategory: function(req, res, next) {
        CategoryModel.findByIdAndDelete(req.params.id, function(err, item) {
            if (err) {
                res.status(404).json({ status: 404, message: "failed to deleted category", data: null })

            } else {
                res.status(201).json({ status: 200, message: "category deleted successufly", data: item })
            }
        })
    }


}