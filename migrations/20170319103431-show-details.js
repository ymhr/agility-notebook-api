'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.addColumn('shows', 'closingDate', Sequelize.DATEONLY);
    queryInterface.addColumn('shows', 'bookedIn', Sequelize.BOOLEAN);
    queryInterface.addColumn('shows', 'paid', Sequelize.BOOLEAN);
    queryInterface.addColumn('shows', 'bookingPlatform', Sequelize.STRING);
    queryInterface.addColumn('shows', 'hotelNeeded', Sequelize.BOOLEAN);
    queryInterface.addColumn('shows', 'hotelBooked', Sequelize.BOOLEAN);
    queryInterface.addColumn('shows', 'holidayNeeded', Sequelize.BOOLEAN);
    queryInterface.addColumn('shows', 'holidayBooked', Sequelize.BOOLEAN);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.removeColumn('shows', 'closingDate');
    queryInterface.removeColumn('shows', 'bookedIn');
    queryInterface.removeColumn('shows', 'paid');
    queryInterface.removeColumn('shows', 'bookingPlatform');
    queryInterface.removeColumn('shows', 'hotelNeeded');
    queryInterface.removeColumn('shows', 'hotelBooked');
    queryInterface.removeColumn('shows', 'holidayNeeded');
    queryInterface.removeColumn('shows', 'holidayBooked');
  }
};
