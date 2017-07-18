import express from 'express';
import bodyParser from 'body-parser';
import db from './db';
import api from './api';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
}

app.get('/', function(req, res) {
  res.send('Ok');
});

app.use('/api', api);

app.listen(5000, function(err) {
  if(!err) {
    db.sequelize
      .authenticate()
      .then(() => {
        if (process.env.NODE_ENV === 'development') {
          console.log('Connection with database has been established successfully.');
        }
        db.sequelize.sync();
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });
  }
  else {
    console.log(err);
  }
});

export default app;
