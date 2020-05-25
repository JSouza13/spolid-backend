import Sequelize, { Model } from 'sequelize';

class Class extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        video_url: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Course, { foreignKey: 'course_id', as: 'course' });
  }
}

export default Class;
