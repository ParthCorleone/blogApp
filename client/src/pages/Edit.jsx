import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_SERVER_URL;

function EditBlog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPublic, setIsPublic] = useState('true');
    const navigate = useNavigate();
    const { id: editId } = useParams();
    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API}/${editId}`, {
                title,
                content,
                isPublic: isPublic === 'true'
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert(`Updated Successfully`);
            navigate('/myBlogs');
        } catch (err) {
            alert(err.message);
        }
    };

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`${API}/my/${editId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTitle(res.data.title);
                setContent(res.data.content);
                setIsPublic(res.data.isPublic ? 'true' : 'false');
            } catch (err) {
                console.error("Error fetching blog:", err.message);
            }
        };
        fetchBlog();
    }, [editId, token]);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Edit Blog</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content:</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            rows="5"
                            required
                        />
                    </div>
                    <div>
                        <p className="block text-sm font-medium text-gray-700">Visibility:</p>
                        <div className="mt-2 flex items-center space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="public"
                                    value="true"
                                    checked={isPublic === 'true'}
                                    onChange={(e) => setIsPublic(e.target.value)}
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                />
                                <span className="ml-2 text-sm text-gray-700">Public</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="public"
                                    value="false"
                                    checked={isPublic === 'false'}
                                    onChange={(e) => setIsPublic(e.target.value)}
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                />
                                <span className="ml-2 text-sm text-gray-700">Private</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <Link to="/myBlogs" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditBlog;