function User(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
}

var users = [
    new User(
        "Username1",
        "Email1",
        "Password1"
    )
];

module.exports = {
    User,
    users
}