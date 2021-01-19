const { DataTypes } = require('sequelize');
const sequelize = require('./Database');

const Todo = sequelize.define('todo', {
  name: DataTypes.STRING,
  completed: DataTypes.BOOLEAN,
});

module.exports = Todo;
