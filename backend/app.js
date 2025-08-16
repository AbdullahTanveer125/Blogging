const express = require("express");
const app = express();
const path = require('path');

const connectDB = require("./DB/database.js");

require("dotenv").config();// import and configuration of dotenv


//connection of mongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

const cors = require("cors");

console.log("HHHHHH===", process.env.HTTP_URL)
app.use(cors({
  origin: process.env.HTTP_URL, // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));


app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // 🔥 serve /uploads folder


const uploadRoute = require('./Routes/upload.js');
const userRouter=require("./Routes/user.js");
const postRouter=require("./Routes/post.js");





//to use router 
app.use(userRouter);
app.use(postRouter);
app.use('/api', uploadRoute);



const PORT = process.env.PORT || 5000;
console.log("Check port =====", process.env.PORT)

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
