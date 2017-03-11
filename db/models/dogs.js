const Sequelize = require('sequelize');
const db = require('../connection');

const Dog = db.define('dogs', {
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
	officialName: Sequelize.STRING,
	grade: {
		type: Sequelize.STRING
	},
	notes: Sequelize.TEXT,
	height: Sequelize.ENUM('small', 'medium', 'large')
});

if(process.env.DEV === 'true'){
	Dog.sync().then(() => {
		console.log('synced dogs');
	})
}

module.exports = Dog;

const User = require('./user');
Dog.belongsTo(User);
