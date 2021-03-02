const userService = require('../dal/user-service');

exports.createUser = async (id, firstName, lastName, username, email) => {
    return userService.createUser({
        id,
        firstName,
        lastName,
        username,
        email
    })
    .catch(err => {
        console.log(err);
    });
}

exports.getUserById = (id) => {
    return userService.getUserById(id)
        .catch(err => {
            console.log(err);
        });
}

exports.updateUser = (id, firstName, lastName, age, workPlace, address) => {
    const userDetails = {
        id,
        firstName,
        lastName,
        age,
        workPlace,
        address
    }
    return userService.updateUser(userDetails)
        .catch(err => {
            console.log(err);
        });
}

exports.updateUsername = (id, username) => {
    return userService.updateUsername(id, username)
        .catch(err => {
            console.log(err);
        });
}