// 'use client';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const AllPosts = () => {
//     const [posts, setPosts] = useState([]);
//     const [visiblePosts, setVisiblePosts] = useState(3);
//     const [loading, setLoading] = useState(false);
//     const [hasMore, setHasMore] = useState(true);

//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 setLoading(true);
//                 const res = await axios.get('http://localhost:5000/api/posts');

//                 if (res.data.success) {
//                     setPosts(res.data.posts);
//                     setHasMore(res.data.posts.length > 3);
//                 }
//             } catch (err) {
//                 console.error('Error fetching posts:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPosts();
//     }, []);

//     const loadMore = () => {
//         setVisiblePosts(prev => prev + 3);
//         // Check if we've reached the end of posts
//         if (visiblePosts + 3 >= posts.length) {
//             setHasMore(false);
//         }
//     };

//     return (
//         <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-32">
//             <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">Latest Blog Posts</h1>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {posts.slice(0, visiblePosts).map((post) => (
//                     <div
//                         key={post._id}
//                         className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
//                     >
//                         <div>
//                             <div className="relative h-60 w-full overflow-hidden">
//                                 <img
//                                     src={post.image || '/placeholder-image.jpg'}
//                                     alt={post.title}
//                                     className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//                                 />
//                                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
//                                     <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
//                                         {post.category}
//                                     </span>
//                                 </div>
//                             </div>

//                             <div className="p-6">
//                                 <div className="flex items-center text-xs text-gray-500 mb-2">
//                                     <span>{new Date(post.createdAt).toLocaleDateString()}</span>
//                                     <span className="mx-2">•</span>
//                                     <span>5 min read</span>
//                                 </div>

//                                 <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
//                                     {post.title}
//                                 </h2>

//                                 <p className="text-gray-600 mb-4 line-clamp-3">
//                                     {post.content}
//                                 </p>

//                                 <div className="flex flex-wrap gap-2 mb-4">
//                                     {post.tags?.map(tag => (
//                                         <span
//                                             key={tag}
//                                             className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
//                                         >
//                                             #{tag}
//                                         </span>
//                                     ))}
//                                 </div>

//                                 <div className="flex items-center justify-center pt-7">

//                                     <Link href={`/posts/${post._id}`}
//                                         className="text-white bg-blue-600 px-2 py-1 rounded-md font-medium hover:text-white hover:bg-black transition-colors cursor-pointer"
//                                     >Read More →</Link>

//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {hasMore && (
//                 <div className="mt-40 text-center">
//                     <button
//                         onClick={loadMore}
//                         disabled={loading}
//                         className={`px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
//                     >
//                         {loading ? 'Loading...' : 'Load More Posts'}
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AllPosts;








































'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AllPosts = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState(3);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${process.env.NEXT_PUBLIC_HTTP_URL}/api/posts`);

                if (res.data.success) {
                    setAllPosts(res.data.posts);
                    setFilteredPosts(res.data.posts);
                    setHasMore(res.data.posts.length > 3);
                }
            } catch (err) {
                console.error('Error fetching posts:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredPosts(allPosts);
            setVisiblePosts(3);
            setHasMore(allPosts.length > 3);
        } else {
            const filtered = allPosts.filter(post =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPosts(filtered);
            setVisiblePosts(3);
            setHasMore(filtered.length > 3);
        }
    }, [searchTerm, allPosts]);

    const loadMore = () => {
        setVisiblePosts(prev => prev + 3);
        if (visiblePosts + 3 >= filteredPosts.length) {
            setHasMore(false);
        }
    };

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-32">
            <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">Latest Blog Posts</h1>

            {/* Search Bar */}
            <div className="mb-12 max-w-2xl mx-auto">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by title, content, or category..."
                        className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute right-3 top-3 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
                {searchTerm && (
                    <p className="mt-2 text-sm text-gray-500">
                        {filteredPosts.length} posts found matching "{searchTerm}"
                    </p>
                )}
            </div>

            {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                    <h3 className="text-xl font-medium text-gray-600">No posts found matching your search</h3>
                    <button
                        onClick={() => setSearchTerm('')}
                        className="mt-4 px-4 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors"
                    >
                        Clear search
                    </button>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.slice(0, visiblePosts).map((post) => (
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
                                                {post.category}
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
                                            <Link href={`/posts/${post._id}`}
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

                    {hasMore && (
                        <div className="mt-32 text-center">
                            <button
                                onClick={loadMore}
                                disabled={loading}
                                className={`cursor-pointer px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-black transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Loading...' : 'Load More Posts'}
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AllPosts;