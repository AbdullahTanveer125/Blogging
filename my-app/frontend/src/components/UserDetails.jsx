'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const UserDetails = () => {
    const { user, token } = useSelector((state) => state.user);
    const [getUser, setGetUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserById = async () => {
            if (!user?._id || !token) return;

            try {
                const res = await axios.get(`http://localhost:5000/user/get/${user._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.data.success) {
                    setGetUser(res.data.user);
                } else {
                    setError('Failed to fetch user data');
                }
            } catch (err) {
                setError('Error fetching user');
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserById();
    }, [user, token]);

    if (loading) return <p className="text-gray-500">Loading user details...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!getUser) return <p className="text-yellow-600">User not found</p>;

    return (
        <div className="p-6  rounded shadow-md bg-white max-w-md mx-auto mt-1">
            {/* <h2 className="text-2xl font-bold text-blue-800 mb-4">User Details</h2>
            <p><span className="font-semibold">Name:</span> {getUser.name}</p>
            <p><span className="font-semibold">Email:</span> {getUser.email}</p>
            <p><span className="font-semibold">DOB:</span> {new Date(getUser.dob).toLocaleDateString()}</p>
            <p><span className="font-semibold">Gender:</span> {getUser.gender}</p> */}









            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="p-8">
                    <div className="flex items-center mb-6">
                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">User Details</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm font-medium text-gray-500">Name</p>
                                <p className="mt-1 text-lg font-semibold text-gray-900">{getUser.name}</p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm font-medium text-gray-500">Email</p>
                                <p className="mt-1 text-lg font-semibold text-gray-900 break-all">{getUser.email}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                                <p className="mt-1 text-lg font-semibold text-gray-900">{new Date(getUser.dob).toLocaleDateString()}</p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm font-medium text-gray-500">Gender</p>
                                <p className="mt-1 text-lg font-semibold text-gray-900 capitalize">{getUser.gender}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default UserDetails;
