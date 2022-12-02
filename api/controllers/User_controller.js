const userModel = require("../models/User_Model");
const ClientModel = require("../models/Client_Model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../middlewares/sendEmail.js")
const crypto = require("crypto");
const nodemailer = require("nodemailer")

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3a09ee4a278bb5",
    pass: "f5c5d6b2ccfaa4"
  }
});
const FRONTEND_URL = process.env.FRONTEND_URL;
const JWT_SECRET = process.env.JWT_SECRET;

const RT_SECRET = process.env.RT_SECRET;

let refreshTokens = [];

// generate Accesstoken
const generateAccessToken = function (user) {
  return jwt.sign({ id:user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "7h",
  });
};

//generate refreshtoken

const generateRefreshToken = function (user) {
  return jwt.sign({ id:user._id, role:user.role }, RT_SECRET, {
    expiresIn: "15h",
  });
};

module.exports = {

  // login: async(req,res)=>{
  //   try {
  //     const user = await UserModel.findOne({email:req.body.email})
  //     if(!user){
  //       res.status(406).json("user not found")
  //     }else{
  //       const validPassword = await bcrypt.compare(req.body.password, user.password)
  //       if(!validPassword) {
  //         res.status(406).json("err password")
  //       }else{
  //         const accessToken = generateAccessToken(user);
  //         const refreshToken = generateRefreshToken(user);
  //         refreshTokens.push(refreshToken);
  
  //         res.status(200).json(user)
  //       } 
  //     } 
  //   } catch (err) {
  //     res.status(500).json(err)
  //   }
      
  //   }


  login:async (req,res)=>{
    
      userModel.findOne({email:req.body.email}, function (err, user) {
        
      if (err) {
        res.status(406).json({ status: 406, message: "error login", data: null });
        
      } else {
        if (user) {
          if (user.verified === false) {
          res.status(406).json({message: "please verify your account"})

         } else {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const accessToken = generateAccessToken(user);
          const refreshToken = generateRefreshToken(user);
          refreshTokens.push(refreshToken);

    
           res.status(200).json({status: 200,message: " user found",data:user,accessToken,refreshToken});
        } else {
          res.status(404).json({status: 406, message: "password incorrect", data: null,});
        }
      }
        }  else {
          res.status(406).json({ status: 406, message: " email is not found", data: null });
        }
      }
    });
  },

  refreshToken: function (req, res, next) {
    //take the refresh token from the user
    const refreshToken = req.body.token;
    //send error if there is no token or it's invalid
    if (!refreshToken) return res.status(401).json("You are not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid");
    }

    jwt.verify(refreshToken, RT_SECRET, function(err, user) {
      err && console.log(err);

      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

      const newAccessToken = generateAccessToken(user);
      const newrefreshToken = generateAccessToken(user);
      refreshTokens.push(newrefreshToken);

      res.status(200).json({accessToken: newAccessToken,refreshToken: newrefreshToken});
    });
  },

  logout: function (req,res) {
    const refreshToken = req.body.token

    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.status(200).json("You logged out successfully.");

  },

  profile: async (req, res, next) => {
    //console.log("user_data ", req.user_data)
    const id = req.user;
    const user = await userModel.findById(id);
    res
      .status(200)
      .json({ status: 200, message: "info Accountfff ", data: req.user });
      
  },


  //Forget password 


forgetPassword : async(req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
     return res.status(400).json({
        message: 'You dont have account in our system ! please go register ! ',
     });
  }
  const resetPasswordToken = generateAccessToken(user);
  user.resetPasswordToken = resetPasswordToken;
  user.save();

  transport.sendMail(
     {
        to: user.email,
        subject: 'Welcome' + user.firstName,
        text: 'Bonjour Mr',
        html: `<!DOCTYPE html>
               <html>
               <head>
                   <meta charset="utf-8">
                   <meta http-equiv="x-ua-compatible" content="ie=edge">
                   <title>Welcome Email</title>
               </head>
               <body>
                   <h2>Hello, ${user.firstName} ${user.lastName}</h2>
                   <p>We're glad to have you on board at ${user.email}</p>
               <a href="${FRONTEND_URL}/resetPassword/${resetPasswordToken}" > Click this link to get newpassword </a>              
                   </body>
                </html>`,
     },

     res.status(200).json({ message: 'Mail Sent successuffly please checkout your email' })
  );
 },

// reset password

resetPassword : async (req, res) => {
  try {
     jwt.verify(req.params.resetPasswordToken, JWT_SECRET, async(err) => {
        if (err) {
           return res.status(404).json({ message: 'token is expired' });
        }
        const user = await userModel.findOne({
           resetPasswordToken: req.params.resetPasswordToken,
        });
      
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.save();
        res.status(200).json({ message: 'password Updated'});
     });

  } catch (error) {
     res.status(400).json({ message: error.message });
  }
},





}
