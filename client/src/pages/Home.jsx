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
        <>
            <h1>Home</h1>
            <ul>
                {Blogs.map(Blog => (
                    <li key={Blog._id}>
                        <h3>{Blog.title}</h3>
                        <p><strong>By:</strong>{Blog.user?.name}</p>
                        <br />
                        <p>{Blog.content}</p>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Home;