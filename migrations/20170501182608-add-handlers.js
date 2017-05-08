'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   queryInterface.createTable('handlers', {
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
   	notes: Sequelize.TEXT
   });
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

   queryInterface.dropTable('handlers');
  }
};
