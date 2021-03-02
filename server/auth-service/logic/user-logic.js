const bcrypt = require('bcrypt');
const userService = require('../dal/user-service');

exports.createUser = async (email, username, password, isOAuth) => {
    return userService.isEmailAvailable(email)
        .then(isEmailAvailable => {
            if (!isEmailAvailable) {
                throw new Error('A user with this email already exists!')
            }
            return userService.isUsernameAvailable(username);
        })
        .then(isUsernameAvailable => {
            if (!isUsernameAvailable) {
                throw new Error('A user with this username already exists!')
            }
            return bcrypt.hash(password, 10);
        })
        .then(hashedPassword => {
            return userService.createUser({
                email,
                username,
                password: hashedPassword,
                isOAuth
            });
        })
        .catch((err) => {
            return { err }
        });

    // let user = await userService.getUserByEmail(email);
    // if (user) {
    //     throw new Error()
    // } else {
    //     const hashedPassword = await bcrypt.hash(password, 10);
    //     if (hashedPassword) {
    //         user = {
    //             email,
    //             password: hashedPassword,
    //             username,
    //             isOAuth,
    //         }
    //         return userService.createUser(user);
    //     }
    // }
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

exports.updatePassword = async (id, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    if (hashedPassword) {
        return userService.updatePassword(id, hashedPassword);
    }
}