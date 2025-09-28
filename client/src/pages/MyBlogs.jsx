import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_SERVER_URL;

function MyBlogs() {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

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
            navigate('/login');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
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
        }
    };

    const handleCreate = () => navigate('/create');
    const handleEdit = (id) => navigate(`/${id}`);

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">My Blogs</h1>
                    <button
                        onClick={handleCreate}
                        className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Create Blog
                    </button>
                </div>
                <ul className="space-y-6">
                    {blogs.length > 0 ? blogs.map(blog => (
                        <li key={blog._id} className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-800">{blog.title}</h3>
                                    <p className="text-sm font-medium mt-1">
                                        <strong>Status:</strong>{' '}
                                        <span className={blog.isPublic ? 'text-green-600' : 'text-red-600'}>
                                            {blog.isPublic ? 'Public' : 'Private'}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex space-x-2 flex-shrink-0">
                                    <button
                                        onClick={() => handleEdit(blog._id)}
                                        className="py-1 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(blog._id)}
                                        className="py-1 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-700 mt-4 whitespace-pre-wrap">{blog.content}</p>
                        </li>
                    )) : (
                        <div className="text-center bg-white p-8 rounded-lg shadow-md">
                            <p className="text-gray-500">You haven't created any blogs yet.</p>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default MyBlogs;