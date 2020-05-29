import Sequelize from 'sequelize';

import Course from '../app/models/Course';
import Enrollment from '../app/models/Enrollment';
import File from '../app/models/File';
import Lesson from '../app/models/Lesson';
import User from '../app/models/User';
import User_lesson from '../app/models/User_class';
import databaseConfig from '../config/database';

const models = [User, File, Course, Lesson, User_lesson, Enrollment];

class Database {
  constructor() {
    this.init();
  }

  init() {
    if (process.env.DATABASE_URL) {
      this.connection = new Sequelize(databaseConfig.production);
    } else {
      this.connection = new Sequelize(databaseConfig.development);
    }

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
