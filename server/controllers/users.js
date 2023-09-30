const { users, User } = require("../models/users");

function signup(req, res) {
    let { username, email, password } = req.body;
    let user = new User(username, email, password);
    
    users.push(user);
    
    res.send(user);
}

function login(req, res) {
    let { email, password } = req.body;
    
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {
            res.send(users[i]);
            return;
        }
    }

    res.status(400).json({ message: "Invalid login info" });
}

function list(req, res) {
    res.send(users);
}

module.exports = {
    signup,
    login,
    list
}
