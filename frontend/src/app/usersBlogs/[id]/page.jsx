// 'use client';
// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';


// const YourBlogs = () => {

//     const { user, token } = useSelector((state) => state.user);

//     console.log("In Your Blogs Page User= ", user)
//     console.log("In Your Blogs Page Token= ", token)
//     // console.log("User id= ", user._id)
//     // const userId= user._id



//     const [blogs, setBlogs] = useState([]);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         const fetchUserBlogs = async () => {
//             try {
//                 setLoading(true);

//                 const res = await axios.get(
//                     `${process.env.NEXT_PUBLIC_HTTP_URL}/my-blogs/${user._id}`,
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`,
//                         },
//                     }
//                 );
//                 console.log("Response from your blogs API: ", res);
//                 if (res.data.success) {
//                     setBlogs(res.data.posts);
//                 }
//             } catch (err) {
//                 console.error('Error fetching user blogs:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUserBlogs();
//     }, [user]);

//     return (
//         <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-32">
//             <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">
//                 Your Blog Posts
//             </h1>

//             {loading ? (
//                 <p className="text-center">Loading...</p>
//             ) : blogs.length === 0 ? (
//                 <div className="text-center">
//                     <h3 className="text-lg text-gray-600">You haven’t written any blogs yet</h3>
//                     <Link
//                         href="/create-post"
//                         className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-black transition"
//                     >
//                         Write Your First Blog
//                     </Link>
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {blogs.map((post) => (
//                         <div
//                             key={post._id}
//                             className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
//                         >
//                             <img
//                                 src={post.image || '/placeholder-image.jpg'}
//                                 alt={post.title}
//                                 className="w-full h-48 object-cover"
//                             />
//                             <div className="p-6">
//                                 <h2 className="text-xl font-bold mb-2">{post.title}</h2>
//                                 <p className="text-gray-600 line-clamp-3">{post.content}</p>
//                                 <div className="mt-4 flex justify-between items-center">
//                                     <Link
//                                         href={`/posts/${post._id}`}
//                                         className="text-white bg-blue-600 px-2 py-1 rounded-md font-medium hover:text-white hover:bg-black transition-colors cursor-pointer"
//                                     >
//                                         Read More →
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default YourBlogs;



















































'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const YourBlogs = () => {
    const { user, token } = useSelector((state) => state.user);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserBlogs = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_HTTP_URL}/api/my-blogs/${user._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (res.data.success) {
                    setBlogs(res.data.posts);
                }
            } catch (err) {
                console.error('Error fetching user blogs:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserBlogs();
    }, [user]);

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-32">
            <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Your Blog Posts
            </h1>

            {loading ? (
                <div className="text-center py-12">
                    <p className="text-gray-600">Loading your posts...</p>
                </div>
            ) : blogs.length === 0 ? (
                <div className="text-center py-12">
                    <h3 className="text-xl font-medium text-gray-600">You haven't written any blogs yet</h3>
                    <Link
                        href="/create-post"
                        className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-black transition"
                    >
                        Write Your First Blog
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((post) => (
                        <div
                            key={post._id}
                            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div>
                                <div className="relative h-60 w-full overflow-hidden">
                                    <img
                                        src={post.image || '/placeholder-image.jpg'}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                        <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                                            {post.category || 'Uncategorized'}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center text-xs text-gray-500 mb-2">
                                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                        <span className="mx-2">•</span>
                                        <span>5 min read</span>
                                    </div>

                                    <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                                        {post.title}
                                    </h2>

                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {post.content}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {post.tags?.map(tag => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-center pt-7">
                                        <Link
                                            href={`/posts/${post._id}`}
                                            className="text-white bg-blue-600 px-2 py-1 rounded-md font-medium hover:text-white hover:bg-black transition-colors cursor-pointer"
                                        >
                                            Read More →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default YourBlogs;