import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    dialect: 'mysql',
    host: 'localhost',
    database: 'gamelibrary',
    username: 'root',
    password: 'root',
  },
  test: {
    dialect: 'mysql',
    host: 'localhost',
    database: 'gamelibrarytest',
    username: 'root',
    password: 'root',
  },
  production: {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
};
