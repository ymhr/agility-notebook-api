const Sequelize = require('sequelize');
const db = require('../connection');


const Settings = db.define('settings', {
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
	value: {
		type: Sequelize.STRING
	}
});

if(process.env.DEV === 'true'){
	Settings.sync().then(() => {
		console.log('synced settings');
	})
}

module.exports = Settings;

const User = require('./user');
Settings.belongsTo(User);
