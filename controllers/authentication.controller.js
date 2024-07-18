const bcrypt = require('bcrypt');
const user = require("../models/user.model");
const jwt = require('jsonwebtoken');

const handleUserSignIn = async (request , response )=>{
    const {  email , password} = request.body ;
    const requiredUser = await user.findOne({email:request.body.email})
  
    bcrypt.compare(password ,  requiredUser.password  , (error , result ) => {
        // result == true
      
        if(result == true )
        {  const  token = jwt.sign({ email: email , user_id:requiredUser._id }, process.env.JWTSECERET);
        response.cookie("token",token);
            response.cookie("token",token);
            response.status(200).redirect("/") ;
        }
    });

}

const handleUserSignUp =  (request , response )=>{
    const { firstname , lastname , username , email , password} = request.body ;
   
    //   console.log(request.file,"HIII");
      const imgPath = `/userprofile/${request.file.filename}` ;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, async (err, hash) =>{
            const newCreatedUser = await user.create({
                firstname,
                lastname,
                username,
                email,
                userProfileImage:imgPath ,
                password: hash
            })

            const  token = jwt.sign({ email: email , user_id:newCreatedUser._id }, process.env.JWTSECERET);
            response.cookie("token",token);
            response.status(200).redirect("/") ;
        });
    });
   
}

const handleUserSignOut = (request , response )=>{
    response.clearCookie("token");
    response.status(200).redirect("/") ;
    }


module.exports = {
    handleUserSignIn , 
    handleUserSignUp ,
    handleUserSignOut 

}