const POST = require('../Model-Schema/post.js');


const createPost = async (req, res) => {
  try {
    const { title, content, category, tags, image } = req.body;

    console.log("user from verify token= ", req.user)
    const authorId = req.user.id; // Provided by `verifyToken` middleware

    const newPost = new POST({
      title,
      content,
      category,
      tags,
      image,
      author: authorId
    });

    const savedPost = await newPost.save();

    res.status(201).json({
      success:true,
      message: 'Post created successfully',
      post: savedPost
    });

  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getAllPost = async (req, res) => {
  try {
    console.log("in All Posts")
    const posts = await POST.find().sort({ createdAt: -1 }); // latest first
    // console.log("posts= ", posts);
    res.json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch posts', error });
  }
}


const getSpecificPost = async (req, res) => {
  try {
    // console.log("in getSpecificPost, req.params.id= ", req.params.id);
    const post = await POST.findById(req.params.id);
    // console.log("post found= ", post);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching post', error });
  }
}


const yourAllPost = async (req, res) => {
  try {
    console.log("req.params.id== ", req.params.id)
    const posts = await POST.find({ author: req.user.id }).sort({ createdAt: -1 }); // latest first
    res.json({ success: true, posts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

const updatePost = async (req, res) => {
  try {
    const updatedPost = await POST.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          tags: req.body.tags,
        },
      },
      { new: true }
    );

    res.json({ success: true, post: updatedPost });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Update failed', error: err });
  }
}




const deletePost = async (req, res) => {
  try {
    const post = await POST.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
}











module.exports = { createPost, getAllPost, getSpecificPost, yourAllPost, updatePost, deletePost };