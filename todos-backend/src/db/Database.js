const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './todos.sqlite',
});

sequelize.sync();

module.exports = sequelize;
