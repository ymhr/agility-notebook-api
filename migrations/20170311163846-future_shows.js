'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   queryInterface.addColumn('runs', 'runningOrder', Sequelize.STRING);
   queryInterface.addColumn('runs', 'ringNumber', Sequelize.INTEGER);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.removeColumn('runs', 'running_order');
    queryInterface.removeColumn('runs', 'ring_number');
  }
};
