'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use((0, _cors2.default)());
}

app.use(_express2.default.static('./client/dist'));

app.use('/api', _api2.default);

app.listen(5000, function (err) {
  if (!err) {
    _db2.default.sequelize.authenticate().then(function () {
      if (process.env.NODE_ENV === 'development') {
        console.log('Connection with database has been established successfully.');
      }
      _db2.default.sequelize.sync();
    }).catch(function (err) {
      console.error('Unable to connect to the database:', err);
    });
  } else {
    console.log(err);
  }
});

exports.default = app;