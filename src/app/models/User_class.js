import Sequelize, { Model } from 'sequelize';

class User_lesson extends Model {
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
    this.belongsTo(models.Lesson, {
      foreignKey: 'lesson_id',
      as: 'lesson',
    });
  }
}

export default User_lesson;
