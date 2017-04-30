'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   queryInterface.addColumn('shows', 'campingRequired', Sequelize.BOOLEAN);
   queryInterface.addColumn('shows', 'campingBooked', Sequelize.BOOLEAN);
   queryInterface.addColumn('shows', 'campingConfirmed', Sequelize.BOOLEAN);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.removeColumn('shows', 'campingRequired');
    queryInterface.removeColumn('shows', 'campingBooked');
    queryInterface.removeColumn('shows', 'campingConfirmed');
  }
};
