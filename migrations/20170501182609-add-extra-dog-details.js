'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   queryInterface.addColumn('dogs', 'registeredNumber', Sequelize.STRING);
   queryInterface.addColumn('dogs', 'meta', Sequelize.TEXT);
   queryInterface.addColumn('dogs', 'breed', Sequelize.STRING);
   queryInterface.addColumn('dogs', 'sex', Sequelize.ENUM('dog', 'bitch'));
   queryInterface.addColumn('dogs', 'dateOfBirth', Sequelize.DATE);
   queryInterface.addColumn('dogs', 'handlerId', Sequelize.INTEGER);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
