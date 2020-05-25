import Sequelize, { Model } from 'sequelize';

class User_class extends Model {
  static init(sequelize) {
    super.init(
      {
        played: Sequelize.DOUBLE,
        watched: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Enrollment, {
      foreignKey: 'enrollment_id',
      as: 'enrollment',
    });
    this.belongsTo(models.Class, {
      foreignKey: 'class_id',
      as: 'class',
    });
  }
}

export default User_class;