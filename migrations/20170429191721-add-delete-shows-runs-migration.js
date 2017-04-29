'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   queryInterface.addColumn('runs', 'deletedAt', Sequelize.DATE);
   queryInterface.addColumn('shows', 'deletedAt', Sequelize.DATE);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.addColumn('runs', 'deletedAt');
    queryInterface.addColumn('shows', 'deletedAt');
  }
};
