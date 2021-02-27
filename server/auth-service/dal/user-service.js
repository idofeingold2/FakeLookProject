const User = require('../models/user');

exports.getUser = (username, password) => {
    User.findOne({where: {username, password}})
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            console.log(err);
        });
}

exports.addUser = (user) => {
    User.create(user)
        .then(createdUser => {
            console.log('user created');
        })
        .catch(err => {
            console.log(err);
        })
}