import User from "../models/User.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req,res) => {
    try {
        const hashedPassword = await bcryptjs.hash(req.body.password, 10);
        const newUser = new User({
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword
        });
        const user = await newUser.save();
        const accesstoken = jwt.sign({ userId : user._id }, process.env.SECRET_KEY, { expiresIn : '1d' });
        res.status(200).json({accesstoken, user : {name : user.name, email: user.email}});
    }  catch (err) {
        res.status(500).json({ message : err.message });
    }
};

export const login = async (req,res) => {
    const user = await User.findOne({email:req.body.email});
    if (!user){
        return res.status(400).json({ message : "Account Does NNot Exist" });
    }
    try {
        const match = await bcryptjs.compare(req.body.password, user.password);
        const accesstoken = jwt.sign({ userId : user._id }, process.env.SECRET_KEY, { expiresIn : '1d' });
        if (match) {
            res.status(200).json({accesstoken, user : { name : user.name, email: user.email }});
        } else {
            res.status(404).json({ message : "Invalid Credentials" });
        }
    }  catch (err) {
        res.status(500).json({ message : err.message });
    }
}