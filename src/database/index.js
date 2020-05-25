import Sequelize from 'sequelize';

import Class from '../app/models/Class';
import Course from '../app/models/Course';
import Enrollment from '../app/models/Enrollment';
import File from '../app/models/File';
import User from '../app/models/User';
import User_class from '../app/models/User_class';
import databaseConfig from '../config/database';

const models = [User, File, Course, Class, User_class, Enrollment];

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
