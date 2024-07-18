const mongoose = require("mongoose") ;



const commentSchema = new mongoose.Schema({
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    createdFor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
    },
    content:{
        type: String,
        required: true

    },
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ]
}) ;



const comment = mongoose.model("comment",commentSchema) ;



module.exports = comment ;