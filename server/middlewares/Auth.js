import jwt from 'jsonwebtoken';

export const Auth = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message : "No token" });
    }
    jwt.verify(token,process.env.SECRET_KEY, (err,user) => {
        if (err) {
            return res.status(403).json({ message : "Invalid Token" });
        }
        req.userId = user.userId;
        next();
    })
};