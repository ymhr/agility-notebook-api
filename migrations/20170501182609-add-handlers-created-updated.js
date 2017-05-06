'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return Promise.all([
         queryInterface.addColumn('handlers', 'createdAt', Sequelize.DATE),
         queryInterface.addColumn('handlers', 'updatedAt', Sequelize.DATE)
    ]);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

    return Promise.all([
         queryInterface.removeColumn('handlers', 'createdAt'),
         queryInterface.removeColumn('handlers', 'updatedAt')
    ]);
  }
};
