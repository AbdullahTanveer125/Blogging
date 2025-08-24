'use client';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import { toast } from 'react-toastify';

const CreatePost = () => {

    const router = useRouter();

    const { token } = useSelector(state => state.user);
    const [form, setForm] = useState({
        title: '',
        content: '',
        category: '',
        tags: '',
        image: ''
    });

    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState('');


    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = e => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const uploadToCloudinary = async () => {
        const data = new FormData();
        data.append('file', imageFile);
        data.append('upload_preset', 'posts_uploads');
        data.append('cloud_name', 'dxznqapuk');

        const res = await fetch('https://api.cloudinary.com/v1_1/dxznqapuk/image/upload', {
            method: 'POST',
            body: data
        });

        const result = await res.json();
        return result.secure_url;
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (form.tags.trim() && !form.tags.includes(',')) {
            setError("Please separate multiple tags with commas (e.g. react, javascript, webdev).");
            return; // stop submission
        }

        setError('');
        try {
            setUploading(true);
            let imageUrl = form.image;

            if (imageFile) {
                imageUrl = await uploadToCloudinary();
            }

            const res = await axios.post(`${process.env.NEXT_PUBLIC_HTTP_URL}/api/posts`, {
                ...form,
                image: imageUrl,
                tags: form.tags.split(',').map(tag => tag.trim()),
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.data.success) {

                setForm({
                    title: '',
                    content: '',
                    category: '',
                    tags: '',
                    image: ''
                });
                setImageFile(null);
                setImagePreview(null);
                toast.success("Post Create successfully!");
                router.push('/');
            }


        } catch (error) {
            console.error('Error creating post:', error.response?.data || error.message);
            alert('Failed to create post');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="pt-32 min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Create New Blog Post
                    </h1>
                    <p className="mt-3 text-xl text-gray-500">
                        Share your thoughts and ideas with the world
                    </p>
                </div>

                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
                        {/* Title Field */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <input
                                id="title"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Your amazing post title"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                        </div>

                        {/* Content Field */}
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                                Content
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                value={form.content}
                                onChange={handleChange}
                                placeholder="Write your post content here..."
                                required
                                rows={8}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                        </div>

                        {/* Category Field */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            >
                                <option value="">Select a category</option>
                                <option value="Tech">Tech</option>
                                <option value="Health">Health</option>
                                <option value="Education">Education</option>
                                <option value="News">News</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Tags Field */}
                        <div>
                            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                                Tags (comma separated)
                            </label>
                            <input
                                id="tags"
                                name="tags"
                                value={form.tags}
                                onChange={handleChange}
                                placeholder="e.g. react, javascript, webdev"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                                Featured Image
                            </label>
                            <div className="mt-1 flex items-center">
                                <label className="cursor-pointer">
                                    <span className="inline-block px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        Choose Image
                                    </span>
                                    <input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="sr-only"
                                    />
                                </label>
                                <span className="ml-3 text-sm text-gray-500">
                                    {imageFile ? imageFile.name : 'No file chosen'}
                                </span>
                            </div>

                            {imagePreview && (
                                <div className="mt-4">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="max-h-64 rounded-lg object-cover shadow-sm"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={uploading}
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${uploading ? 'opacity-70 cursor-not-allowed' : ''} cursor-pointer`}
                            >
                                {uploading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Publishing...
                                    </>
                                ) : 'Publish Post'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;