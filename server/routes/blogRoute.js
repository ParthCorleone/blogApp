import { Auth } from "../middlewares/Auth.js";
import express from 'express';
import { register, login } from "../controllers/userController.js";
import { CreateBlog, getBlogs, updateBlogs, deleteBlog, display, getSingleBlog } from "../controllers/blogController.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/', Auth, CreateBlog);
router.get('/my', Auth, getBlogs);
router.put('/:id', Auth, updateBlogs);
router.delete('/:id', Auth, deleteBlog);
router.get('/',display);
router.get('/my/:id', Auth, getSingleBlog);

export default router;

