const bcrypt = require('bcrypt');
const userService = require('../dal/user-service');

exports.createUser = (email, username, password, isOAuth) => {
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
}

exports.login = (email, password) => {
    let user;
    return userService.getUserByEmail(email)
        .then(fetchedUser => {
            if (!fetchedUser) {
                throw new Error('No user with this email was found. Please try a different email');
            }
            user = fetchedUser;
            return this.checkPassword(user, password);
        })
        .then(isConnect => {
            if (!isConnect) {
                throw new Error('Wrong Password! Please try again');
            }
            return user;
        })
        .catch(err => {
            return { err }
        })
}

exports.checkPassword = (user, password) => {
    if (user && !user.isOAuth) {
        return bcrypt.compare(password, user.password)
            .catch(err => {
                console.log(err);
            });
    }
    return false;
}

exports.canChangePassword = (email) => {
    return userService.getUserByEmail(email)
        .then(user => {
            if (!user) {
                throw new Error('A user with that email does not exists!');
            } else if (user.isOAuth) {
                throw new Error('This email was registered via Google or Facebook')
            } else {
                return true;
            }
        })
        .catch(err => {
            return { err }
        })
}

exports.updatePassword = (id, password) => {
    return bcrypt.hash(password, 10)
        .then(hashedPassword => {
            if (hashedPassword) {
                return userService.updatePassword(id, hashedPassword)
            }
        })
        .catch(err => {
            console.log(err);
        })
}

exports.updateUsername = (id, username) => {
    return userService.isUsernameAvailable(username)
        .then(isUserAvailable => {
            if (!isUserAvailable) {
                throw new Error('This username is already taken, please choose a different one.');
            } else {
                return userService.updateUsername(id, username);
            }
        })
        .catch(err => {
            return { err }
        });
}