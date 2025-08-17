// app/post/[id]/page.jsx
'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';

const PostDetailPage = () => {

    const { user } = useSelector(state => state.user);
    const { token } = useSelector(state => state.user);
    
    

    console.log("Token in [id]----> page", token)
    const { id } = useParams();
    const router = useRouter();
    const [post, setPost] = useState(null);
    const [your, setYour] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                
                const res = await axios.get(`${process.env.NEXT_PUBLIC_HTTP_URL}/api/posts/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Response from post API: ", res.data.post.author);
                if (res.data.post.author==user._id) setYour(true);
                // const data = await res.json();
                if (res.data.success) setPost(res.data.post);
            } catch (err) {
                console.error('Error fetching post:', err);
            }
        };
        if (id) fetchPost();
    }, [id, token]);


    const handleDelete = async () => {
        const confirmed = confirm('Are you sure you want to delete this post?');
        if (!confirmed) return;

        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_HTTP_URL}/api/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.data.success) {
                toast.success("Delete Post successfully!");
                router.push('/');
            } else {
                alert('Failed to delete post');
            }
        } catch (err) {
            console.error('Error deleting post:', err);
            alert('Delete failed');
        }
    };




    if (!post) return <p className="p-4">Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 pt-28 pb-32">
            <img src={post.image} alt="Post" className="w-full h-96 object-cover rounded mb-4" />
            <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
            <p className="text-gray-500 text-sm mb-2">Category: {post.category}</p>
            <p className="text-gray-500 text-sm mb-2">Tags: {post.tags.join(', ')}</p>
            <p className="text-lg">{post.content}</p>
            <p className="mt-4 text-sm text-gray-400">Likes: {post.likes}</p>
            <p className="text-sm text-gray-400">Created: {new Date(post.createdAt).toLocaleString()}</p>







            {your ? (
                <>
                    <button
                        className="mt-6 px-4 py-2 bg-blue-500 font-bold text-white rounded hover:bg-blue-700 cursor-pointer"
                        onClick={() => router.push(`/posts/${id}/edit`)}
                    >
                        Edit Post
                    </button>

                    <button
                        className="ml-3 font-bold px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                        onClick={handleDelete}
                    >
                        Delete Post
                    </button>
                </>
            ) : (
                <>


                </>
            )}

            {/* <div className=''>
                <button
                    className="mt-6 px-4 py-2 bg-blue-500 font-bold text-white rounded hover:bg-blue-700 cursor-pointer"
                    onClick={() => router.push(`/posts/${id}/edit`)}
                >
                    Edit Post
                </button>

                <button
                    className="ml-3 font-bold px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                    onClick={handleDelete}
                >
                    Delete Post
                </button>
            </div> */}
        </div>
    );
};

export default PostDetailPage;
