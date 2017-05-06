const Sequelize = require('sequelize');
const db = require('../connection');

const Handler = db.define('handlers', {
	 id: {
		 type: Sequelize.INTEGER,
		 autoIncrement: true,
		 unique: true,
		 primaryKey: true
	 },
	 userId: {
		 type: Sequelize.INTEGER
	 },
	 name: {
		 type: Sequelize.STRING
	 },
	 notes: Sequelize.TEXT
});

if(process.env.DEV === 'true'){
	Handler.sync().then(() => {
		console.log('synced handlers');
	})
}

module.exports = Handler;

const Dog = require('./dogs');
Handler.hasMany(Dog);
