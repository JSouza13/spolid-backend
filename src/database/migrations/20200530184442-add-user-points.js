module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'points_cash', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('users', 'points_cash');
  },
};
