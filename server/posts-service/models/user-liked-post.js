const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const UserLikedPost = sequelize.define('user-liked-post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    liked: DataTypes.BOOLEAN,
});

module.exports = UserLikedPost;