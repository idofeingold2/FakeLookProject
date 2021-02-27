const bcrypt = require('bcrypt');
const userService = require('../dal/user-service');

exports.createUser = async (firstName, lastName, username, email, password, isOAuth) => {
    let user = await userService.getUserByEmail(email);
    if (user) {
        return null;
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        if (hashedPassword) {
            user = {
                firstName,
                lastName,
                username,
                email,
                password: hashedPassword,
                isOAuth,
                friends: 0
            }
            return userService.createUser(user);
        }
    }
}

exports.getUserById = async (id) => {
    const user = await userService.getUserById(id);
    return user;
}

exports.getUserByEmail = async (email) => {
    const user = await userService.getUserByEmail(email);
    return user;
}

exports.checkPassword = async (user, password) => {
    if (user && !user.isOAuth) {
        const match = await bcrypt.compare(password, user.password);
        return match
    }
    return false;
}