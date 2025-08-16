const express = require('express');

const userRouter = express.Router();
const { signup, login, getUser } = require('../Controllers/user');

const verifyToken = require('../Middlewares/auth');


userRouter.post('/api/auth/signup', signup);

userRouter.post('/api/auth/login', login);


userRouter.get('/user/get/:id', getUser);



module.exports = userRouter;
