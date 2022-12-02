const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET

const verifyToken = function(req, res, next) {

    const authHeader = req.headers.authorization

    if (authHeader) {

        const token = authHeader

        jwt.verify(token, JWT_SECRET, (err,user)=>{
            if (err) {
               res.status(403).json({ message: "token is not valid!" })
            } else {
                req.user = user
                next()
            }

        });

    } else {
       return res.status(401).json({ message: "You are not authenticated!" })
    }
}

const verifyTokenAndAuthorization = (req,res,next)=>{

    verifyToken(req,res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
     
            next();
            
        } else {
            
          return  res.status(403).json("You are not allowed to do that!!!!!!");

    }
    });
  };


  const verifyTokenAndAdmin = function(req, res, next) {

    verifyToken(req, res, () => {
  
      if (req.user.isAdmin) {
  
        next();
      } else {
        res.status(403).json("You are not allowed to do that???");
      }
    });
  };

  

 module.exports ={ verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin}