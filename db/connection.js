const Sequelize = require('sequelize');
require('dotenv').config();

const db = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    pool: {
       max: 5,
       min: 0,
       idle: 10000
     }
});

// const db = new Sequelize('postgres://homestead:secret@127.0.0.1:54320/agility-notebook');

module.exports = db;
