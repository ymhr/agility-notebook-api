const Sequelize = require('sequelize');
const db = require('../connection');

console.log('running user');

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    facebookId: {
        type: Sequelize.STRING,
        unique: true
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    facebookToken: Sequelize.STRING,
	facebookRefreshToken: Sequelize.STRING
});

if(process.env.DEV === 'true'){
	User.sync().then(() => {
        console.log('synced user');
    })
}

module.exports = User;

const Shows = require('./shows');
User.hasMany(Shows);