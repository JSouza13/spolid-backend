module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_classes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      enrollment_id: {
        type: Sequelize.INTEGER,
        references: { model: 'enrollments', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      class_id: {
        type: Sequelize.INTEGER,
        references: { model: 'classes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      played: {
        type: Sequelize.DOUBLE,
        defaultValue: 0,
        allowNull: false,
      },
      watched: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('user_classes');
  },
};
