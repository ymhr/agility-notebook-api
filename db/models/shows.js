const Sequelize = require('sequelize');
const db = require('../connection');


const Shows = db.define('shows', {
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
    startDate: {
        type: Sequelize.DATEONLY
    },
    endDate: {
        type: Sequelize.DATEONLY
    },
    postcode: Sequelize.STRING,
    notes: Sequelize.TEXT,
    closingDate: Sequelize.DATEONLY,
    bookedIn: Sequelize.BOOLEAN,
    paid: Sequelize.BOOLEAN,
    bookingPlatform: Sequelize.STRING,
    hotelNeeded: Sequelize.BOOLEAN,
    hotelBooked: Sequelize.BOOLEAN,
    holidayNeeded: Sequelize.BOOLEAN,
    holidayBooked: Sequelize.BOOLEAN
}, {
	paranoid: true
});

if(process.env.DEV === 'true'){
    Shows.sync().then(() => {
        console.log('synced shows');
    })
}

module.exports = Shows;

const User = require('./user');
Shows.belongsTo(User);

const Run = require('./runs');
Shows.hasMany(Run);
