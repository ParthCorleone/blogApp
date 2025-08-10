import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }
    return (
        <>
            {isLoggedIn ? (
                <div>
                    <Link to='/'>Home</Link> |
                    <Link to='/myBlogs'>My Blogs</Link> |
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <Link to='/'>Home</Link> |
                    <Link to='/login'>Login</Link> |
                    <Link to='/register'>Register</Link>
                </div>
            )}
        </>
    );
};

export default Navbar;