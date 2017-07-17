import Express from 'express';
import BodyParser from 'body-parser';
import Db from './db';
import API from './api';

const app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.send('Ok');
});

app.use('/api', API);

app.listen(5000, function(err) {
  if(!err) {
    Db.sequelize
      .authenticate()
      .then(() => {
        if (process.env.NODE_ENV === 'development') {
          console.log('Connection with database has been established successfully.');
        }
        Db.sequelize.sync();
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
