const User = require('../models/user');

exports.getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ where: { email } })
        if (user)
            return user.dataValues;
    } catch (err) {
        console.log(err);
    }
}

exports.getUserById = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (user)
            return user.dataValues;
    } catch (err) {
        console.log(err);
    }
}

exports.createUser = async (user) => {
    try {
        const createdUser = await User.create(user)
        return createdUser.dataValues;
    } catch (err) {
        console.log(err);
    }
}

exports.updatePassword = async (id, password) => {
    try {
        let user = await User.findByPk(id);
        user.password = password;
        return user.save();
    } catch (err) {
        console.log(err);
    }
}