import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_SERVER_URL;

function Home() {
    const [ Blogs, setBlogs ] = useState([]);

    const fetchBlog = async () => {
        const res = await axios.get(API);
        setBlogs(res.data);
    }

    useEffect(()=> {
        fetchBlog();
    },[]);

    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">All Blogs</h1>
                {Blogs.length > 0 ? (
                    <ul className="space-y-6">
                        {Blogs.map(Blog => (
                            <li key={Blog._id} className="bg-white p-6 rounded-lg shadow-md transition hover:shadow-lg">
                                <h3 className="text-2xl font-semibold text-gray-800">{Blog.title}</h3>
                                <p className="text-sm text-gray-500 mt-1 mb-4">
                                    <strong>By:</strong> {Blog.user?.name || 'Unknown Author'}
                                </p>
                                <p className="text-gray-700 whitespace-pre-wrap">{Blog.content}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500 mt-8">No blogs available at the moment.</p>
                )}
            </div>
        </div>
    )
}

export default Home;