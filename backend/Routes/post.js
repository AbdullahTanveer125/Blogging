const express = require('express');

const postRouter = express.Router();
const verifyToken = require('../Middlewares/auth');

const { createPost,
    getAllPost,
    getSpecificPost,
    yourAllPost,
    updatePost,
    deletePost
} = require('../Controllers/post.js');








postRouter.post('/api/posts', verifyToken, createPost); // Authenticated route

// postRouter.get('/api/posts/:id', getSpecificPost);

// GET all posts
postRouter.get('/api/posts', getAllPost);

// GET single post by ID (already provided earlier)
postRouter.get('/api/posts/:id', verifyToken, getSpecificPost);


postRouter.get('/my-blogs/:id', verifyToken, yourAllPost);


// PUT: Update post by ID
postRouter.put('/api/posts/:id', verifyToken, updatePost);


postRouter.delete('/api/posts/:id', verifyToken, deletePost);

module.exports = postRouter;