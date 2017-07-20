'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

exports.default = {
  development: {
    dialect: 'mysql',
    host: 'localhost',
    database: 'gamelibrary',
    username: 'root',
    password: 'root'
  },
  test: {
    dialect: 'mysql',
    host: 'localhost',
    database: 'gamelibrarytest',
    username: 'root',
    password: 'root',
    logging: false
  },
  production: {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  }
};