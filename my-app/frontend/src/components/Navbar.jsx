"use client";
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes, FaSearch, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import { clearUser } from '../Slices/userSlice'; // update path to your actual file
import { useRouter } from 'next/navigation';

import { toast } from 'react-toastify';

export default function Navbar() {

    const dispatch = useDispatch();
    const router = useRouter();

    const { user } = useSelector(state => state.user);
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when clicking a link
    const closeMobileMenu = () => setIsOpen(false);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setUserDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const toggleUserDropdown = () => {
        setUserDropdownOpen(!userDropdownOpen);
    };




    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch(clearUser()); // Clear Redux state
        toast.success("Logout successfully!");
        router.push('/'); // Navigate to contact page
    };

    return (
        <nav className={` fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-blue-500 py-2 shadow-lg' : 'bg-blue-500 py-2'} border-b-4 border-b-blue-500 backdrop-blur-md`}>
            <div className="max-w- mx-auto px-4 sm:px-6 lg:px-8">
                <div className=" flex items-center justify-between h-16 rounded-full px-7">
                    {/* Left - Logo */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <img src="/logo.png" alt="Logo" className="h-12 w-12" />
                            <span className="ml-2 text-xl font-extrabold text-white">
                                Blogger
                            </span>
                        </div>
                    </div>

                    {/* Center - Links (Desktop) */}
                    <div className="hidden md:block text-black">
                        <div className="ml-10 flex items-center space-x-8">
                            <Link href="/" className=" hover:text-blue-500 hover:bg-white  px-3 py-2 rounded-md transition duration-300 text-white font-bold">
                                Home
                            </Link>

                            <Link href="/posts" className=" hover:text-blue-500 hover:bg-white px-3 py-2 rounded-md  text-white font-bold transition duration-300">
                                All Blogs
                            </Link>




                            {user ? (
                                <>
                                    <Link href="/posts/new" className=" hover:text-blue-500 hover:bg-white px-3 py-2 rounded-md  text-white font-bold transition duration-300">
                                        Create Blog
                                    </Link>

                                    <Link href={`/usersBlogs/${user._id}`} className=" hover:text-blue-500 hover:bg-white px-3 py-2 rounded-md  text-white font-bold transition duration-300">
                                        Your Blogs
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className=" hover:text-white hover:bg-black bg-white px-3 py-2 rounded-md  text-blue-600 font-bold transition duration-300 cursor-pointer"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>


                                </>
                            )}
                            {/* <button
                                onClick={handleLogout}
                                className=" hover:text-white hover:bg-black bg-white px-3 py-2 rounded-md  text-blue-600 font-bold transition duration-300 cursor-pointer"
                            >
                                Logout
                            </button> */}
                        </div>
                    </div>

                    {/* Right - Buttons (Desktop) */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (

                            <div className='text-white'>Login as <span className='ml-3 bg-white font-bold text-blue-500 px-2 py-1 rounded-md'>{user.name}</span></div>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="px-5 py-2 border-2 border-blue-500 rounded-full text-white font-bold hover:bg-black hover:text-white hover:border-black transition-all duration-300 cursor-pointer flex items-center gap-2"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/signup"
                                    className="bg-white px-5 py-2 border-2 border-blue-500 rounded-full text-blue-500 hover:bg-black hover:text-white hover:border-black transition-all duration-300 cursor-pointer flex items-center gap-2"
                                >
                                    <FaUser size={14} /> Sign-up
                                </Link>

                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-whi hover:text-pink-400 focus:outline-none transition duration-300"
                        >
                            {isOpen ? (
                                <FaTimes className="h-6 w-6" />
                            ) : (
                                <FaBars className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black bg-opacity-90">
                    <Link
                        href="/"
                        onClick={closeMobileMenu}
                        className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-800 transition duration-300"
                    >
                        Home
                    </Link>
                    <Link href="/posts"
                        onClick={closeMobileMenu}
                        className=" hover:text-blue-500 hover:bg-white px-3 py-2 rounded-md font-bold  text-white">
                        All Blogs
                    </Link>


                    {user ? (
                        <>
                            <div className='flex flex-col items-start mt-2'>
                                <Link href="/posts/new"
                                    onClick={closeMobileMenu}
                                    className=" hover:text-blue-500 hover:bg-white px-3 py-2 rounded-md  text-white font-bold transition duration-300">
                                    Create Blog
                                </Link>

                                <Link href={`/usersBlogs/${user._id}`}
                                    onClick={closeMobileMenu}
                                    className=" hover:text-blue-500 hover:bg-white px-3 py-2 rounded-md  text-white font-bold transition duration-300">
                                    Your Blogs
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="px-3 text-white font-bold cursor-pointer "
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <>


                        </>
                    )}


                    <div className="px-3 pt-2 pb-3 flex flex-row justify-center space-x-4 mt-10 ">
                        {user ? (
                            <>
                                <div className='text-white'>Login as <span className='bg-white text-black px-3 py-1 rounded-md'>{user.name}</span></div>
                            </>
                        ) : (
                            <>
                                {/* <button
                                    onClick={() => signIn()}
                                    className="bg-transparent text-white border border-white px-4 py-1 rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer flex-1 text-center"
                                >
                                    Login
                                </button> */}
                                <Link
                                    href="/login"
                                    onClick={closeMobileMenu}
                                    className="px-5 py-2 border-2 border-blue-500 rounded-full text-white font-bold hover:bg-black hover:text-white hover:border-black transition-all duration-300 cursor-pointer flex items-center gap-2"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    onClick={closeMobileMenu}
                                    className="bg-white px-5 py-2 border-2 border-blue-500 rounded-full text-blue-500 hover:bg-black hover:text-white hover:border-black transition-all duration-300 cursor-pointer flex items-center gap-2"
                                >
                                    <FaUser size={14} /> Sign-up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}