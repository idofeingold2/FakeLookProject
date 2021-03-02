const User = require('../models/user');

exports.getUserById = (id) => {
    return User.findByPk(id)
        .then(user => {
            if(user)
                return user.dataValues;
        })
        .catch(err => {
            console.log(err);
        });
}

exports.createUser = (user) => {
    return User.create(user)
        .then(createdUser => {
            if(createdUser)
                return createdUser.dataValues;
        })
        .catch(err => {
            console.log(err);
        });
}

exports.updateUser = (updatedUser) => {
    return User.findByPk(updatedUser.id)
        .then(user => {
            if(user){
                user = {...user, ...updatedUser};
                return user.save();
            }
        })
        .then(user => {
            return user.dataValues;
        })
        .catch(err => {
            console.log(err);
        });
}

exports.updateUsername = (id, username) => {
    return User.findByPk(id)
        .then(user => {
            if(user){
                user.username = username;
                user.save();
            }
        })
        .then(updatedUser => {
            return updatedUser.dataValues;
        })
        .catch(err => {
            console.log(err);
        });
}