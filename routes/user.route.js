const userRouter = require("express").Router();
const user = require("../models/user.model.js");
const post = require("../models/post.model")
const comment = require("../models/comment.model.js") ;
const multer  = require('multer')

const {
  handleUserCreatePost,
  handleUserGetPost,
} = require("../controllers/user.controller.js");



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
   return  cb(null, "./public/userposts")
  },
  filename: function (req, file, cb) {
   
     return cb(null,  `${Date.now()}-${file.originalname}`.toString())
  }
})

const upload = multer({ storage: storage })

userRouter.post("/comment:post_id", async (request , response )=>{
     const post_id = request.params.post_id.slice(1) ;
     const userComment = request.body.postcomment ;
     const user_id = request.currentUser._id;

     const newCreatedComment = await comment.create({
      createdBy:user_id,
      createdFor:post_id ,
      content:userComment ,
     }) ;
     
     await post.findOneAndUpdate({
      _id:post_id
     },{
      $push:{
        comments:newCreatedComment._id
        }
     })

     response.redirect(`/post:${post_id}`);
}) ;

userRouter.get("/profile", async (request, respone) => {
  const currentLoggedInUser = request.currentUser ;
  const currentUserPosts = await user.findOne({_id:currentLoggedInUser._id}).populate("posts")
  

  respone.render("../views/profile.ejs",{
    currentUserPosts:{
      posts:currentUserPosts.posts ,
    
    },
    user:currentLoggedInUser,
    
    img:currentLoggedInUser.userProfileImage
  });
});

userRouter.post("/post",upload.single("post-image"), handleUserCreatePost);

userRouter.get("/like",async (request , response )=>{
  const likedPostId = request.query.id ;
   const likedUserId = request.currentUser._id ;

    const likedPost = await post.findOne({_id:likedPostId}) ;
    if( likedPost.likes.indexOf(likedUserId) !== -1 )
    {
      response.redirect("/");
    }
    else
    {
      await post.findOneAndUpdate({_id:likedPostId},{
        $push:{likes:likedUserId}
       })
    
        
       console.log(likedUserId,likedPostId);
       response.redirect("/");
    }
  
})


module.exports = {
  userRouter,
};
