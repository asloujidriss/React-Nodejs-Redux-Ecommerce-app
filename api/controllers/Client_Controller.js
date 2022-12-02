const ClientModel = require("../models/Client_Model")
const nodemailer = require("nodemailer")
const path = require('path')
const bcrypt = require("bcrypt")

const { randomBytes } = require('crypto');
const { join } = require('path');

const DOMAIN = process.env.APP_DOMAIN

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3a09ee4a278bb5",
      pass: "f5c5d6b2ccfaa4"
    }
  });

module.exports = {
    
    create: async(req, res,next)=>{

        req.body.image= req.file?.filename
          
          const user = new ClientModel({...req.body, verificationCode: randomBytes(6).toString('hex')})
           const email = await ClientModel.findOne({email:req.body.email})
          if(email){
            
          res.status(404).json({message: "user has Already exist"})
            }else{
            user.save(req.body, function(err, item) {
                if (err) {
                    res.status(406).json({ success: false, message: "Failed to register" +err, data: null })
                } else {
                    transport.sendMail({
                        from: "myapp@gmail.com",
                        to: item.email,
                        cc: 'asloujidriss@gmail.com',
                        bcc: "asloujidriss@gmail.com",
                        subject: "Welcome " + item.firstName,
                        text: "bonjour mr ",
                        html: `<!DOCTYPE html>
                        <html>
                        <head>
                          <meta charset="utf-8">
                          <meta http-equiv="x-ua-compatible" content="ie=edge">
                          <title>Welcome Email</title>
                        </head>
                        <body>
                          <h2>Hello ${item.firstName +" "+ item.lastName}! </h2>
                          <p>We're glad to have you on board at ${item.email}. </p>
                          <p>We're glad to have you on board at it gate</p>
                          <a href="${DOMAIN}/clients/verify-now/${item.verificationCode}" >Click here to Verify your account </a>
    
                        </body>
                        </html>`,
                        attachments: [{
                            filename: req.file.filename,
                            path: "./storages/" + req.file.filename,
                            cid: "test"
                        }]
                    }, function(err, info) {
                        if (err) {
                            console.log("error:", err)
                        } else {
                            console.log("Email Send successufly:", info + reponse)
                        }
    
                    })
                    res.status(200).json({ success: true, message: "success register", data: item })
                }
            })
         }
      
    },
    VerifyMail: async(req, res) => {
        try {
           const user = await ClientModel.findOne({verificationCode: req.params.verificationcode});
           user.verified = true;
           user.verificationCode = undefined;
           user.save();
           /* res.status(200).json({
              message: 'User verified',
           }); */
           res.sendFile(join(__dirname,'../Verfication-Templates/success.html'));
        } catch (error) {
            console.log(error)
           res.sendFile(join(__dirname,'../Templates/error.html'));
        }
     },
    alldelete: function (req, res, next) {
               ClientModel.deleteMany(function (err, item) {
            if (err) {
                res.status(406).json({ status: 406, message: 'error remove all users', data: null })
            } else {
                res.status(201).json({ status: 200, message: 'users deleted successuffly', data: item })
            }
        })
    },

    getAll: function(req, res) {

        ClientModel.find({}, function(err, items) {
            if (err) {
                res.status(406).json({ success: false, message: "Failed to got all clients", data: null })
            } else {
                res.status(201).json({ success: true, message: "List of Clients", data: items })
            }
        })
    },

    getById: function(req, res) {

        ClientModel.findById(req.params.id).populate({path:"orders"}).exec(function(err, item) {
            if (err) {
                res.status(404).json({ success: false, message: "Failed to got  client by Id", data: null })
            } else {
                res.status(201).json({ success: true, message: "List of Clients", data: item })
            }
        })
    },
    getByName: async(req, res)=> {
        let {q} = req.query

        let data = await ClientModel.find(
            {
                $or: [
                    {firstName: { $regex: q, $options: "i" }},
                    {lastName: { $regex: q, $options: "i" }},
                    {email: { $regex: q, $options: "i" }},
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
            user.password = req.body.password 
            }       
           ClientModel.findByIdAndUpdate(user, req.body, { new: true }, function(err, item, next) {

            if (err) {
                res.status(404).json({ success: false, message: "Failed to updated ", data: null })
            } else {
                res.status(201).json({ success: true, message: "success updated", data: item })
            }
        })
    },

    delete: function(req, res) {
        ClientModel.findByIdAndRemove(req.params.id, function(err, item) {


            if (err) {
                res.status(404).json({ success: false, message: "Failed to Deleted ", data: null })
            } else {
                res.status(201).json({ success: true, message: "success deleted", data: item })
            }
        })
    },
    // get User stats
    getstats: async(req, res)=>{

        const date = new Date()
        const lastYear = new Date(date.setFullYear(date.getFullYear() -1))
        try {
            const data =  await ClientModel.aggregate([

            { $match: { createdAt: {$gte: lastYear} } },
            { $project:{ month:{$month: "$createdAt"} } },
            { $group:{ _id:"$month", total:{$sum: 1} } }

        ])
        const NewData = data.sort((a,b)=> a._id < b._id ? -1 : 1)

        res.status(200).json({message:"users stats",data:NewData})
            
        } catch (error) {
            res.status(500).json(error)   
        }
       } 
    
}