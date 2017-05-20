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
	height: Sequelize.ENUM('small', 'medium', 'large'),
	registeredNumber: Sequelize.INTEGER,
	meta: Sequelize.TEXT,
	breed: Sequelize.STRING,
	sex: Sequelize.ENUM('male', 'female'),
	dateOfBirth: Sequelize.DATEONLY,
	lowerHeight: Sequelize.BOOLEAN,
	notForCompetition: Sequelize.BOOLEAN
});

if(process.env.DEV === 'true'){
	Dog.sync().then(() => {
		console.log('synced dogs');
	})
}

module.exports = Dog;

const User = require('./user');
const Handler = require('./handlers');
Dog.belongsTo(User);
Dog.belongsTo(Handler)
