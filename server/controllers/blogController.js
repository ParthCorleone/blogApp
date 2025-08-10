import Blog from "../models/Blog.js";

export const CreateBlog = async (req,res) => {
    try {
        const {title, content, isPublic} = req.body;
        const newBlog = new Blog({ user : req.userId, title, content, isPublic});
        const blog = await newBlog.save();
        res.status(200).json(blog);
    }  catch (err) {
        res.status(500).json({ message : err.message });
    }
};

export const getBlogs = async (req,res) => {
    try {
        const blogs = await Blog.find({user:req.userId}).sort({ createdAt : -1 });
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ message : err.message });
    }
};

export const updateBlogs = async (req,res) => {
    try {
        const allowedFields = [ "title", "content", "isPublic" ];
        const updates = {};
        allowedFields.forEach(field => {
            if (req.body[field] !== undefined){
                updates[field] = req.body[field];
            }
        });
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            updates,
            { new : true }
        );
        if (!blog) {
            return res.status(404).json({ message : "Blog Does Not Exist" });
        }
        res.status(200).json(blog);
    }  catch (err) {
        res.status(500).json({ message : err.message });
    }
};

export const deleteBlog = async (req,res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).json({ message : "Blog Does Not Exist" });
        }
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ message : err.message });
    }
}

export const display = async (req,res) => {
    try {
        const blogs =  await Blog.find({ isPublic : true }).populate( 'user' , 'name' ).sort({ createdAt : -1 });
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ message : err.message });
    }
};

export const getSingleBlog = async (req,res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message : "Blog Does Not Exist" });
        }
        res.status(200).json(blog);
    }catch (err) {
        res.status(500).json({ message : err.message });
    }
};