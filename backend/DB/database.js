const colors =require("colors")
const mongoose = require("mongoose");


const connectDB=async function(){
    mongoose.connect(process.env.MONGODB_URI)//it return promise.we handle promise with "then()" and "catch()"
    .then(function () {
        console.log('Connected to MongoDB'.bgMagenta);
    })
    .catch(function (err) {
        console.error(`Error connecting to MongoDB:${err}`.bgRed);
    }
);
}

module.exports=connectDB;

