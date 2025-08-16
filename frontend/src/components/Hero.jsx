'use client'; // Required for animations

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
    // Animation effect for the hero text
    useEffect(() => {
        const animateText = () => {
            const elements = document.querySelectorAll('.hero-text-animate');
            elements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('opacity-100', 'translate-y-0');
                }, 200 * index);
            });
        };

        animateText();
    }, []);

    return (
        <section className="relative bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-20 left-10 w-40 h-40 bg-blue-400 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-60 h-60 bg-indigo-400 rounded-full filter blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    {/* Left side - Text content */}
                    <div className="text-center md:text-left">
                        <h1 className="hero-text-animate text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 transform translate-y-10 opacity-0 transition-all duration-500">
                            Discover Amazing <span className="text-blue-600">Blog</span> Content
                        </h1>

                        <p className="hero-text-animate text-lg md:text-xl text-gray-600 mb-8 transform translate-y-10 opacity-0 transition-all duration-500 delay-100">
                            Read, learn and explore with our collection of insightful articles written by passionate writers.
                        </p>

                        <div className="hero-text-animate flex flex-col sm:flex-row gap-4 justify-center md:justify-start transform translate-y-10 opacity-0 transition-all duration-500 delay-200">
                            <Link
                                href="/posts"
                                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg transition-colors"
                            >
                                Explore Blogs
                            </Link>
                            <Link
                                href="/register"
                                className="px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-lg transition-colors"
                            >
                                Join Our Community
                            </Link>
                        </div>

                        <div className="hero-text-animate mt-12 flex items-center justify-center md:justify-start space-x-4 transform translate-y-10 opacity-0 transition-all duration-500 delay-300">

                            <div className="text-sm text-gray-600">
                                <span className="font-semibold">10,000+</span> readers already enjoying our content
                            </div>
                        </div>
                    </div>

                    {/* Right side - Image */}
                    <div className="hero-text-animate relative transform translate-y-10 opacity-0 transition-all duration-500 delay-100">
                        <div className="relative aspect-square w-full max-w-lg mx-auto">
                            <Image
                                src="/m-1.jpg" // Replace with your hero image
                                alt="People reading blogs"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}