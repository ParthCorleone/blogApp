import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_SERVER_URL;

function MyBlogs() {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // fixed typo

    const fetchBlogs = async () => {
        try {
            const res = await axios.get(`${API}/my`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBlogs(res.data);
        } catch (err) {
            console.error("Error fetching blogs:", err);
            navigate('/login'); // optional: redirect to login if unauthorized
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            await fetchBlogs();
        } catch (err) {
            console.error("Error deleting blog:", err);
        }
    };

    const handleCreate = () => navigate('/create');

    const handleEdit = (id) => navigate(`/${id}`);

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <>
            <h1>My Blogs</h1>
            <button onClick={handleCreate}>Create Blog</button>
            <ul>
                {blogs.map(blog => (
                    <li key={blog._id}>
                        <h3>{blog.title}</h3>
                        <p>{blog.content}</p>
                        <p><strong>Public:</strong> {blog.isPublic ? 'Yes' : 'No'}</p>
                        <button onClick={() => handleEdit(blog._id)}>Edit</button>
                        <button onClick={() => handleDelete(blog._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default MyBlogs;
