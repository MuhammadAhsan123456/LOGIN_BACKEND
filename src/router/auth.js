const express = require('express');
const appRouter = express.Router();
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require("jsonwebtoken");

appRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("Email and Password are required!");
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found with this email!");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Incorrect Password!");
        }

        const token = jwt.sign({ id: user._id }, "Ali@321", { expiresIn: '1d' });

        res.cookie("token", token, {
            expires: new Date(Date.now() + 10 * 60 * 1000), // 10 mins
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });

        res.send("Login Successful!");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


appRouter.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName) {
            throw new Error("Name not found!");
        }

        if (!validator.isEmail(email)) {
            throw new Error("Invalid Email!");
        }

        if (!validator.isStrongPassword(password)) {
            throw new Error("Type a Strong password!");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists with this email!");
        }

        const passwordHashed = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            email,
            password: passwordHashed
        });

        await user.save();

        const token = jwt.sign({ id: user._id }, "Ali@321", { expiresIn: '1d' });

        res.cookie("token", token, {
            expires: new Date(Date.now() + 10 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });

        res.send('User Added Successfully!');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

appRouter.post('/logout', (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.send("Logout Successfully!");
});

module.exports = {
    appRouter
};
