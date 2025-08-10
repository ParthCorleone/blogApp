import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    title : {
        type : String,
        required : true
    },
    content : {
        type : String
    },
    isPublic : {
        type : Boolean,
        required : true
    }
}, { timestamps : true });

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;