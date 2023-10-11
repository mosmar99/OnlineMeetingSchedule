const User = require('../models/users');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

async function signup(req, res) {
    try {

        const user = await User.findOne({email: req.body.email});

        if (user) {
            return res.status(500).json({message: "User already exists! try logging in."})
        }
        
        let password = await bcrypt.hash(req.body.password, 10);
        let userData = {...req.body}
        const newUser = new User({...req.body, password: password});

        // Save to DB
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user" });
    }
}
  
async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ message: "Invalid login info" });
        }

        let valid = await bcrypt.compare(req.body.password, user.password)
        if (valid) {
            res.json(user);
        } else {
            res.status(401).json({ message: "Invalid login info" });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error during login" });
    }
}

async function list(req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting all users" });
    }
}

module.exports = {
    signup,
    login,
    list
}
