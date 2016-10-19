const Sequelize = require('sequelize');
const db = require('../connection');

const Run = db.define('runs', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		unique: true,
		primaryKey: true
	},
	userId: {
		type: Sequelize.INTEGER
	},
	showId: {
		type: Sequelize.INTEGER
	},
	dogId: {
		type: Sequelize.INTEGER
	},
	clear: {
		type: Sequelize.BOOLEAN
	},
	faults: {
		type: Sequelize.FLOAT
	},
	grade: {
		type: Sequelize.STRING
	},
	order: {
		type: Sequelize.INTEGER
	},
	notes: Sequelize.TEXT,
	place: Sequelize.INTEGER
});

if(process.env.DEV === 'true'){
	Run.sync().then(() => {
		console.log('synced runs');
	})
}

module.exports = Run;

const User = require('./user');
const Dog = require('./dogs');
const Show = require('./shows');

Run.belongsTo(Show);
Run.belongsTo(User);
Run.belongsTo(Dog);
