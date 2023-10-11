const User = require('../models/users');
const mongoose = require('mongoose');

async function signup(req, res) {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user" });
    }
}
  
async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
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
