import Sequelize, { Model } from 'sequelize';

class Class extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        video_url: Sequelize.STRING,
        watched: Sequelize.BOOLEAN,
        played: Sequelize.DOUBLE,
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
