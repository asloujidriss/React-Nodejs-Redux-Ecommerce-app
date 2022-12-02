const AdminModel = require("../models/Admin_Model")
const nodemailer = require("nodemailer")
const path = require('path')
const bcrypt = require("bcrypt")
var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "c7903c5eb4820f",
        pass: "55eda7ac279ed9"
    }
});


module.exports = {
    create: function(req, res) {

        req.body.image= req.file?.filename

        const user = new AdminModel(req.body)
        
        user.save(req.body, function(err, item) {
            if (err) {
                res.status(406).json({ success: false, message: "Failed to register" +err, data: null })
            } else {
                // transport.sendMail({
                //     from: "myapp@gmail.com",
                //     to: item.email,
                //     cc: 'asloujidriss@gmail.com',
                //     bcc: "asloujidriss@gmail.com",
                //     subject: "Welcome " + item.firstName,
                //     text: "bonjour mr ",
                //     html: `<!DOCTYPE html>
                //     <html>
                //     <head>
                //       <meta charset="utf-8">
                //       <meta http-equiv="x-ua-compatible" content="ie=edge">
                //       <title>Welcome Email</title>
                //     </head>
                //     <body>
                //       <h2>Hello ${item.firstName +" "+ item.lastName}! </h2>
                //       <p>We're glad to have you on board at ${item.email}. </p>
                //       <p>We're glad to have you on board at it gate</p>
                    

                
                     
                    // </body>
                    // </html>`,
                    // attachments: [{
                    //     filename: req.file.filename,
                    //     path: "./storages/" + req.file.filename,
                    //     cid: "test"
                    // }]
                // }, function(err, info) {
                //     if (err) {
                //         console.log("error:", err)
                //     } else {
                //         console.log("Email Send successufly:", info + reponse)
                //     }

                // })



                res.status(200).json({ success: true, message: "success register", data: item })
            }
        })
    },

    getAll: function(req, res) {

        AdminModel.find({}, function(err, items) {
            if (err) {
                res.status(406).json({ success: false, message: "Failed to got all Admin", data: null })
            } else {
                res.status(201).json({ success: true, message: "List of Admin", data: items })
            }
        })
    },

    getById: function(req, res) {

        AdminModel.findById(req.params.id, function(err, item) {
            if (err) {
                res.status(404).json({ success: false, message: "Failed to got  Admin by Id", data: null })
            } else {
                res.status(201).json({ success: true, message: "List of Clients", data: item })
            }
        })
    },
    getByName: async(req, res)=> {


        let {q} = req.query

        let data = await AdminModel.find(
            {
              
                $or: [
                    {
                        firstName: { $regex: q, $options: "i" },
                    },
                    {
                        lastName: { $regex: q, $options: "i" },
                    },
                    {
                        email: { $regex: q, $options: "i" },
                    },
                  ],
            }
        )
         res.status(201).json(data);
       
    },

     updateProfile: function (req, res) {

        const user = req.params.id
        const image = user.image


        req.body.image= !req.file ? image : req.file.filename
        
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(
                req.body.password,10
                ).toString();
            }       
           AdminModel.findByIdAndUpdate(user, req.body, { new: true }, function(err, item, next) {

            if (err) {
                res.status(404).json({ success: false, message: "Failed to updated ", data: null })
            } else {
                res.status(201).json({ success: true, message: "success updated", data: item })
            }
        })
    },
    delete: function(req, res) {
        AdminModel.findByIdAndRemove(req.params.id, function(err, item) {


            if (err) {
                res.status(404).json({ success: false, message: "Failed to Deleted ", data: null })
            } else {
                res.status(201).json({ success: true, message: "success deleted", data: item })
            }
        })
    },
    
}