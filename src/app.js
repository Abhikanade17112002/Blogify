require("dotenv").config();
const express = require("express");
const path = require("path");
const post = require("../models/post.model.js")
const cookieParser = require("cookie-parser");
const connectToMongoDB = require("../database/blog.database.js");
const { authenticationRouter } = require("../routes/authentication.route.js");
const { userRouter } = require("../routes/user.route.js");
const handleIsUserLoggedIn = require("../middlewares/userAuthentication.middleware.js");
const comment = require("../models/comment.model.js");



// App
const App = express();

// Middlewares

App.set("view engine", "ejs");

App.use(express.static("public"));
App.use(express.urlencoded({ extended: true }));
App.use(express.json());
App.use(cookieParser());



App.get("/", async (request, response) => {
  const userToken = request.cookies.token  ;
  const allPosts = await post.find({}).populate("createdBy") ;

  
  console.log(allPosts);
  response.render("index.ejs",{
    "token":userToken
    ,
    allPosts
  });
});
App.get("/post:id", async (request, response) => {
  const postId = request.params.id.slice(1);
const requiredPost = await post.findById(postId).populate("createdBy");
const postComments = await comment.find({createdFor:postId}).populate("createdBy") ;
console.log(postComments);
  response.render("../views/comment.ejs",{
    id:request.params.id,
    "token":request.cookies.token,
    post:requiredPost,
    postComments
  })
});
App.use(authenticationRouter);
App.use("/user", handleIsUserLoggedIn, userRouter);

// DataBase Connection
connectToMongoDB()
  .then((connectionInstance) => {
    console.log(
      "Database Connected :: HOST => ",
      connectionInstance.connection.host
    );

    // Server
    App.listen(process.env.PORT, () => {
      console.log("Server is running on port :: ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(" MONGO DB CONNECTION FAILED :: ERROR ", error);
    return;
  });
