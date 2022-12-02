const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")
const crypto = require("crypto")

const baseOptions = {

    discriminatorKey: "itemtype",
    collections: "users"
}

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        trim: true,
        required: [true, "please enter your firstName"]
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "please enter your lastName"]
    },
    email: {
        type: String,
        trim: true,
        unique:true,
        required: [true, "please enter your email"],
        validate: [validator.isEmail, "please Enter a valid Email"]
    },
    password: {
        type: String,
        trim: true,
        required: [true, "please enter your password"]
    },
   
    resetPasswordToken: {
        type: String
     },
    tel: {
        type: String,
        trim: true,
        required: [true, "please enter your phone number"],
        minLength: [8, "Minimum tel length characters"],
        maxLength: [8, "Max tel length characters"]
    },
    image: {
        type: String,
        trim: true
    
    },
    dob:{
        type: String,
        required:true,
    },
    gender:{
        type: String,
        required:true,
    },
    verified: {
        type: Boolean,
        default: false,
     },
     verificationCode: {
        type: String,
        required: false,
     },
 


}, baseOptions, { timestamps: true })

//hash password
userSchema.pre("save", function(next) {
    if(this.password) {                                                                                                                                                        
        var salt = bcrypt.genSaltSync(10) 
    this.password = bcrypt.hashSync(this.password, salt)
}
    next()
})


module.exports = mongoose.model("Users", userSchema)