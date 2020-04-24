require('dotenv/config');

module.exports = {
  development: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    operatorsAliases: false,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
  production: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    operatorsAliases: false,
    use_env_variable: process.env.DATABASE_URL,
    dialectOptions: {
      ssl: true,
    },
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
};
