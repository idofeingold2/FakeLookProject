const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Comment = sequelize.define('comment', {
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
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    likes: DataTypes.INTEGER
});

module.exports = Comment;