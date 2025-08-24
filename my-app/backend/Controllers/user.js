const USER = require('../Model-Schema/user');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
    try {
        const { name, dob, gender, email, password } = req.body;

        // Check for existing user
        const existingUser = await USER.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Create user
        // const newUser = new USER({ name, dob, gender, email, password });
        // await newUser.save();

        // 🔐 Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await USER.create({
            name,
            dob,
            gender,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            success: true,
            message: 'User registered successfully'
        });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ success: false, message: 'Server error during signup' });
    }
};



const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await USER.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || "yoursecretkey",
            { expiresIn: '1d' }
        );



        // Return user (without password)
        const { password: pw, ...userData } = user._doc;
        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: userData
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
};




const getUser = async (req, res) => {
    try {
        console.log("In login function", req.params.id)
        
        // console.log("=============", user)
        const user = await USER.findById(req.params.id).select('-password');
        
        
        console.log("=============", user)

        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'User not found' 
            });
        }
        // res.json(users);
        res.status(200).json({
            success: true,
            message: 'Get user successfully',
            user,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



module.exports = { signup, login, getUser };
