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
    ),
    new User(
        "Johan Falk",
        "Email2",
        "Password2"
    ),
    new User(
        "Charles Ingvar Jönsson",
        "Email3",
        "Password3"
    ),
    new User(
        "Dynamit Harry",
        "Email4",
        "Password4"
    )
];

module.exports = {
    User,
    users
}