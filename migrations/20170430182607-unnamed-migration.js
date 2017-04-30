'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   queryInterface.addColumn('runs', 'campingRequired', Sequelize.BOOLEAN);
   queryInterface.addColumn('runs', 'campingBooked', Sequelize.BOOLEAN);
   queryInterface.addColumn('runs', 'campingConfirmed', Sequelize.BOOLEAN);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.removeColumn('runs', 'campingRequired');
    queryInterface.removeColumn('runs', 'campingBooked');
    queryInterface.removeColumn('runs', 'campingConfirmed');
  }
};
