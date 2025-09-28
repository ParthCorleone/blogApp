import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const linkStyles = `
        text-gray-300 hover:bg-gray-700 hover:text-white 
        px-4 py-2 text-base
        sm:px-3 sm:py-2 sm:text-sm 
        rounded-md font-medium transition-colors
    `;

    const buttonStyles = `
        text-red-500 hover:bg-red-600 hover:text-white 
        px-4 py-2 text-base
        sm:px-3 sm:py-2 sm:text-sm
        rounded-md font-medium transition-colors
    `;

    return (
        <nav className="bg-gray-800 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    
                    {/* Brand Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-white font-bold text-xl">
                            BlogApp
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex ml-10 items-baseline space-x-4">
                        <Link to="/" className={linkStyles}>Home</Link>
                        {isLoggedIn ? (
                            <>
                                <Link to="/myBlogs" className={linkStyles}>My Blogs</Link>
                                <button onClick={handleLogout} className={buttonStyles}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className={linkStyles}>Login</Link>
                                <Link to="/register" className={linkStyles}>Register</Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            {/* Hamburger icon */}
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
                    <Link to="/" className={linkStyles} onClick={() => setIsOpen(false)}>Home</Link>
                    {isLoggedIn ? (
                        <>
                            <Link to="/myBlogs" className={linkStyles} onClick={() => setIsOpen(false)}>My Blogs</Link>
                            <button onClick={handleLogout} className={buttonStyles}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className={linkStyles} onClick={() => setIsOpen(false)}>Login</Link>
                            <Link to="/register" className={linkStyles} onClick={() => setIsOpen(false)}>Register</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;
