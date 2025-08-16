"use client"

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Slices/userSlice';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

import Link from 'next/link';

import { toast } from 'react-toastify';

export default function LoginForm() {


    const router = useRouter();

    const dispatch = useDispatch();
    const [form, setForm] = useState({ email: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [focusedField, setFocusedField] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!form.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_HTTP_URL}/api/auth/login`, form);
            console.log("On login Page= ", res.data.user);

            if (res.data.success) {
                const { user, token } = res.data;

                // Save user + token securely
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', token);

                // dispatch(setUser(user));
                dispatch(setUser({ token, user }));
                // alert('Login success!');
                toast.success("Login successfully!");
                router.push('/');
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrors({
                ...errors,
                server: error.response?.data?.message || 'Login failed. Please check your credentials.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pt-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
            >
                {/* Header with gradient background */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
                    <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
                    <p className="mt-1 text-blue-100">Sign in to your account</p>
                </div>

                {/* Form container */}
                <div className="p-6 md:p-8 space-y-4">
                    {errors.server && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r flex items-start">
                            <svg className="h-5 w-5 text-red-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm text-red-700">{errors.server}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <div className={`relative rounded-lg border-2 ${errors.email ? 'border-red-300' : 'border-gray-200'} ${focusedField === 'email' ? 'ring-2 ring-blue-200 border-blue-500' : ''}`}>
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <FiMail className="h-5 w-5" />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    className="block w-full pl-10 pr-3 py-2.5 rounded-lg focus:outline-none text-gray-800 bg-transparent"
                                    placeholder="your@email.com"
                                    autoComplete="username"
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className={`relative rounded-lg border-2 ${errors.password ? 'border-red-300' : 'border-gray-200'} ${focusedField === 'password' ? 'ring-2 ring-blue-200 border-blue-500' : ''}`}>
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <FiLock className="h-5 w-5" />
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    className="block w-full pl-10 pr-3 py-2.5 rounded-lg focus:outline-none text-gray-800 bg-transparent"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                />
                            </div>
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                        </div>


                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isSubmitting}
                            className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-md transition-all mt-2
                                ${isSubmitting
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'}`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing In...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center cursor-pointer">
                                    Login <FiArrowRight className="ml-2 h-5 w-5" />
                                </span>
                            )}
                        </motion.button>
                    </form>

                    <div className="text-center text-sm text-gray-500 pt-4">
                        Don't have an account?{' '}

                        <Link
                            href="/signup"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Signup
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}