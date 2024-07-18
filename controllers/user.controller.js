const user = require("../models/user.model.js");
const post = require("../models/post.model")
const path = require("path");

const handleUserCreatePost = async (request , response ) =>{
  const currentUser = request.currentUser ;
  
  const {title,content} = request.body ;
  const imgPath = `/userposts/${request.file.filename}` ;
  console.log(imgPath,request.file.filename,path.resolve(imgPath));
  
   
 const createdPost = await post.create({
    title,
    content,
    createdBy:currentUser._id,
    userPostImage:imgPath,
    postCreatedTime : `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
    username:currentUser.username,
 })

 await user.findOneAndUpdate(currentUser._id,{
    $push:{posts:createdPost._id}
 })
  response.status(200).redirect("/user/profile");
} ;


module.exports = {
    handleUserCreatePost
}