const route = require("express").Router()

const usercontroller = require("../controllers/User_controller")


const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin}= require("../middlewares/authentification")

route.post("/login", usercontroller.login)

route.post("/refreshtoken", usercontroller.refreshToken)
route.post("/logout", usercontroller.logout)
route.get("/profile", usercontroller.profile)


route.post('/forgetPassword', usercontroller.forgetPassword);
route.post('/resetPassword/:resetPasswordToken', usercontroller.resetPassword);









//route.post("/refresh", check_refresh_auth, usercontroller.refreshtoken)


module.exports = route