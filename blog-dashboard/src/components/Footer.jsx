"use client";// src/components/Footer.js

import Link from 'next/link';
import { FaFacebook } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
// import { IoMdPhone } from 'react-icons/io';
import { FaMapMarkerAlt } from 'react-icons/fa';
// import { IoMdPhone } from 'react-icons/io5';
import { FaPhoneAlt } from "react-icons/fa";


export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Logo and Description */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            {/* <img src="/logo.png" alt="Logo" className="h-8 w-8" /> */}
                            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                                Blogger
                            </span>
                        </div>
                        <p className="text-gray-400">
                            Discover your next favorite blog with our comprehensive collection of content from around the world.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-pink-500 transition duration-300">
                                <FaFacebook size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-pink-500 transition duration-300">
                                <FaTwitter size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-pink-500 transition duration-300">
                                <FaInstagram size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-pink-500 transition duration-300">
                                <FaYoutube size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-pink-500 transition duration-300">
                                <FaLinkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-pink-500 transition duration-300">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/movies" className="text-gray-400 hover:text-pink-500 transition duration-300">
                                    Blogs
                                </Link>
                            </li>
                            
                            <li>
                                <Link href="/trending" className="text-gray-400 hover:text-pink-500 transition duration-300">
                                    Trending
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Information</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-gray-400 hover:text-pink-500 transition duration-300">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-400 hover:text-pink-500 transition duration-300">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-gray-400 hover:text-pink-500 transition duration-300">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-gray-400 hover:text-pink-500 transition duration-300">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-gray-400 hover:text-pink-500 transition duration-300">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Contact Us</h3>
                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <FaMapMarkerAlt className="text-pink-500 mt-1 flex-shrink-0" />
                                <p className="text-gray-400">
                                    123 Street, Hollywood, CA 90210, United States
                                </p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaPhoneAlt className='text-pink-500' />
                                <a href="tel:+11234567890" className="text-gray-400 hover:text-pink-500 transition duration-300">
                                    +1 (123) 456-7890
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <MdEmail className="text-pink-500" />
                                <a href="mailto:info@movieexplorer.com" className="text-gray-400 hover:text-pink-500 transition duration-300">
                                    info@blogger.com
                                </a>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="mt-4">
                            <h4 className="text-sm font-semibold text-white mb-2">Subscribe to our newsletter</h4>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="bg-gray-800 text-white px-4 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-pink-500 w-full"
                                />
                                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-400 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} Blogger. All rights reserved.
                    </p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <Link href="/privacy" className="text-gray-500 hover:text-pink-500 text-sm transition duration-300">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-gray-500 hover:text-pink-500 text-sm transition duration-300">
                            Terms of Service
                        </Link>
                        <Link href="/sitemap" className="text-gray-500 hover:text-pink-500 text-sm transition duration-300">
                            Sitemap
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}