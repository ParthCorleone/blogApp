import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";

const API = import.meta.env.VITE_SERVER_URL;

function CreateBlog() {
    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');
    const [ isPublic, setisPublic ] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post(API, {
                title, content, isPublic : isPublic === 'true',
            }, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });
            alert("Added Successfully");
            navigate('/myBlogs');
            setTitle('');
            setContent('');
            setisPublic('');
        } catch (err) {
            alert(err.message);
        }
    };

    return(
        <>
            <h1>Create Job</h1>
            <form onSubmit={handleSubmit}>
                <label>Title: </label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <br />
                <label>Content: </label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                <br />
                <p>Set Public: </p>
                <label>
                    <input type="radio" name="public" value="true" checked={isPublic === 'true'} onChange={(e) => setisPublic(e.target.value)} /> Yes
                </label>
                <label>
                    <input type="radio" name="public" value="false" checked={isPublic === 'false'} onChange={(e) => setisPublic(e.target.value)} /> No
                </label>
                <button type="submit">Create</button>
            </form>
            <Link to='/myBlogs'>Back To MyBlogs</Link>
        </>
    );
}

export default CreateBlog;