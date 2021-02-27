const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const UserLikedComment = sequelize.define('user-liked-comment', {
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

module.exports = UserLikedComment;