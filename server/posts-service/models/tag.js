const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Tag = sequelize.define('tag', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Tag;
