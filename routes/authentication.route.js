const authenticationRouter = require("express").Router();
const {
  handleUserSignIn,
  handleUserSignUp,
  handleUserSignOut
} = require("../controllers/authentication.controller.js");
const multer  = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
     return  cb(null, "./public/userprofile")
    },
    filename: function (req, file, cb) {
     
       return cb(null,  `${Date.now()}-${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage })
authenticationRouter
  .get("/signup", (request, respone) => {
    respone.render("../views/signup.ejs");
  })
  .post("/signup", upload.single("image") ,handleUserSignUp);

authenticationRouter
  .get("/signin", (request, respone) => {
    respone.render("../views/signin.ejs");
  })
  .post("/signin", handleUserSignIn);


  authenticationRouter.get("/signout",handleUserSignOut) ;
module.exports = {
  authenticationRouter,
};
