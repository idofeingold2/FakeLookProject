const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const UserFriends = sequelize.define('user-friends', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    isAccepted: DataTypes.BOOLEAN,
    areStillFriends: DataTypes.BOOLEAN
});

module.exports = UserFriends;