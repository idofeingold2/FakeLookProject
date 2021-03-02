const User = require('../models/user');

exports.getUserByEmail = (email) => {
    return User.findOne({ where: { email } })
        .then(user => {
            if (user)
                return user.dataValues;
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getUserById = (id) => {
    return User.findByPk(id)
        .then(user => {
            if (user)
                return user.dataValues;
        })
        .catch(err => {
            console.log(err);
        });
}

exports.createUser = (user) => {
    return User.create(user)
        .then(createdUser => {
            if (createdUser)
                return createdUser.dataValues;
        })
        .catch(err => {
            console.log(err);
        });
}

exports.updatePassword = (id, password) => {
    return User.findByPk(id)
        .then(user => {
            user.password = password;
            return user.save();
        })
        .then(updatedUser => {
            if (updatedUser)
                return updatedUser.dataValues;
        })
        .catch(err => {
            console.log(err);
        });
}

exports.isEmailAvailable = (email) => {
    return User.findOne({ where: { email } })
        .then(user => {
            if (user) return false;
            return true;
        })
        .catch(err => {
            console.log(err);
        });
}

exports.isUsernameAvailable = (username) => {
    return User.findOne({ where: { username } })
        .then(user => {
            if (user) return false;
            return true;
        })
        .catch(err => {
            console.log(err);
        });
}