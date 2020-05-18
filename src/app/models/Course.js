import Sequelize, { Model } from 'sequelize';

class Course extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        value: Sequelize.DECIMAL,
        complete: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'image_id', as: 'image' });
    this.belongsTo(models.File, { foreignKey: 'video_id', as: 'video' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'intructor' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'student' });
  }
}

export default Course;
