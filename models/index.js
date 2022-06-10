const Sequelize = require('sequelize');
const User = require('./user');
const Contest = require('./contest');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.User = User;
db.Contest = Contest;

User.init(sequelize);
Contest.init(sequelize);

User.associate(db);
Contest.associate(db);

module.exports = db;
