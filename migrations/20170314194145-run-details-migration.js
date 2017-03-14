'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.addColumn('runs', 'classSize', Sequelize.INTEGER);
	queryInterface.addColumn('runs', 'judge', Sequelize.STRING);
	queryInterface.addColumn('runs', 'type', Sequelize.ENUM('agility', 'jumping', 'special')); //Agility, jumping or special
	queryInterface.addColumn('runs', 'gradeType', Sequelize.ENUM('graded', 'combined')); //true = graded, false = combined
	queryInterface.addColumn('runs', 'classNumber', Sequelize.INTEGER);
	queryInterface.addColumn('runs', 'courseTime', Sequelize.FLOAT);
	queryInterface.addColumn('runs', 'runTime', Sequelize.FLOAT); //my time
	queryInterface.addColumn('runs', 'courseLength', Sequelize.INTEGER);

  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.removeColumn('runs', 'classSize');
    queryInterface.removeColumn('runs', 'judge');
    queryInterface.removeColumn('runs', 'type');
    queryInterface.removeColumn('runs', 'gradeType');
    queryInterface.removeColumn('runs', 'classNumber');
    queryInterface.removeColumn('runs', 'courseTime');
    queryInterface.removeColumn('runs', 'runTime');
    queryInterface.removeColumn('runs', 'courseLength');
  }
};
