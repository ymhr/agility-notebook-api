'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });

    */

    queryInterface.addColumn('runs', 'eliminated', Sequelize.BOOLEAN);
    queryInterface.addColumn('runs', 'winningTime', Sequelize.FLOAT);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

   return queryInterface.removeColumn('runs', ['winningTime', 'elimiated']);
  }
};
