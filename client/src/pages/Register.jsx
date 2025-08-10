import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_SERVER_URL;

function Register() {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = !!localStorage.getItem('token');
        if (isLoggedIn) {
            navigate('/');
        }
    },[navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API}/register`, {
                name, email, password
            });
            localStorage.setItem('token', res.data.accesstoken);
            navigate('/');
            alert(`Registeration Successful`);
        } catch (err) {
            alert(err.message);
        }
        setName('');
        setEmail('');
        setPassword('');
    };

    return (
        <>
            <h1>Register</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <label>Name: </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <br />
                <label>Email: </label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label>Password: </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button type="submit">Register</button>
            </form>
            <Link to='/login'>Already Have an Account</Link>
        </>
    );
};

export default Register;