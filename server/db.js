import Sequelize from 'sequelize';
import glob from 'glob';
import path from 'path';
import config from './config/db';

const env = process.env.NODE_ENV || 'development';
const db = {};

let sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  config[env]
);

const files = glob.sync("**/*.model.js", { cwd: __dirname });

files.forEach(file => {
  const model = sequelize.import(path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
