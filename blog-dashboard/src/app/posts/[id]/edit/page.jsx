'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

import { useSelector } from 'react-redux';

const EditPostPage = () => {

    const { token } = useSelector(state => state.user);

    const { id } = useParams();
    const router = useRouter();
    const [form, setForm] = useState({
        title: '',
        content: '',
        category: '',
        tags: '',
    });


    console.log("======= In edit page =======", id)

    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_HTTP_URL}/api/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // const data = await res.json();
            console.log("res.data ==", res.data)
            if (res.data.success) {
                const { title, content, category, tags } = res.data.post;
                setForm({ title, content, category, tags: tags.join(', ') });
            }
        };
        if (id) fetchPost();
    }, [id]);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async e => {
        e.preventDefault();
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_HTTP_URL}/api/posts/${id}`, {
                ...form,
                tags: form.tags.split(',').map(tag => tag.trim()),
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

            if (res.data.success) {
                toast.success("Update Post successfully!");
                router.push(`/posts/${id}`);
            }
        } catch (error) {
            alert('Update failed');
            console.error(error);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 pt-32">
            <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
                <input
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <textarea
                    name="content"
                    placeholder="Content"
                    value={form.content}
                    onChange={handleChange}
                    className="w-full p-2 border rounded h-32"
                />
                <input
                    name="category"
                    placeholder="Category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    name="tags"
                    placeholder="Tags (comma separated)"
                    value={form.tags}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <button type="submit" className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded">
                    Update Post
                </button>
            </form>
        </div>
    );
};

export default EditPostPage;
