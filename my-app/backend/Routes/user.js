const express = require('express');

const userRouter = express.Router();
const { signup, login, getUser } = require('../Controllers/user');

const verifyToken = require('../Middlewares/auth');


userRouter.post('/auth/signup', signup);

userRouter.post('/auth/login', login);


userRouter.get('/user/get/:id', getUser);



module.exports = userRouter;
