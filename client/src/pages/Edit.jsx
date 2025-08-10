import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_SERVER_URL;

function EditBlog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPublic, setIsPublic] = useState('true'); // default to string 'true'
    const navigate = useNavigate(); // ⬅️ lowercase 'n'
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
            setTitle('');
            setContent('');
            setIsPublic('true');
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
                setIsPublic(res.data.isPublic ? 'true' : 'false'); // 🔁 consistent values
            } catch (err) {
                console.error("Error fetching blog:", err.message);
            }
        };
        fetchBlog();
    }, [editId]);

    return (
        <>
            <h1>Edit Blog</h1>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <br />
                <label>Content:</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                <br />
                <p>Set Public:</p>
                <label>
                    <input
                        type="radio"
                        name="public"
                        value="true"
                        checked={isPublic === 'true'}
                        onChange={(e) => setIsPublic(e.target.value)}
                    /> Yes
                </label>
                <label>
                    <input
                        type="radio"
                        name="public"
                        value="false"
                        checked={isPublic === 'false'}
                        onChange={(e) => setIsPublic(e.target.value)}
                    /> No
                </label>
                <br />
                <button type="submit">Edit</button>
            </form>
            <Link to="/myBlogs">Back To My Blogs</Link>
        </>
    );
}

export default EditBlog;
