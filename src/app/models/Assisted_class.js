import Sequelize, { Model } from 'sequelize';

class Assisted_class extends Model {
  static init(sequelize) {
    super.init(
      {
        progress: Sequelize.DOUBLE,
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
  }
}

export default Assisted_class;
