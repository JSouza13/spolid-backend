module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'password_reset_expires', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('users', 'password_reset_expires');
  },
};
