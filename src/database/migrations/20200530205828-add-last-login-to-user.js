module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'last_login', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('users', 'last_login');
  },
};
