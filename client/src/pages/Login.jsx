import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_SERVER_URL;

function Login() {
    const navigate = useNavigate();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    
    useEffect(() => {
        const isLoggedIn = !!localStorage.getItem('token');
        if (isLoggedIn) {
            navigate('/');
        }
    },[navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API}/login`, {
                email, password
            });
            localStorage.setItem('token', res.data.accesstoken);
            navigate('/');
            alert("Login Successful");
        } catch (err) {
            alert(err.message);
        }
        setEmail('');
        setPassword('');
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Email: </label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label>Password: </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button type="submit">Login</button>
            </form>
            <Link to='/register'>Don't have an Account</Link>
        </>
    )
};

export default Login;