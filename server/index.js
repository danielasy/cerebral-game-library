import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db';
import api from './api';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}

app.use(express.static('./client/dist'));

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
