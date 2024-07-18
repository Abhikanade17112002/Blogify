const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    username:{
      type: String,
      required: true,
      default:"guestuser@123"
    },

    content: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    userPostImage: {
      type: String,
      required: true,
      default: "./images/user.jpg",
    
      
    },
    postCreatedTime:{
      type: String,
      required : true  
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
        },
        ]
  },
  { timestamps: true }
);

const post = mongoose.model("post", postSchema);

module.exports = post;
