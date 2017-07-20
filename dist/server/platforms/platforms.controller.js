'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroy = exports.update = exports.show = exports.create = exports.index = undefined;

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Platform = _db2.default.Platform;

var index = function index(req, res) {
  Platform.findAll().then(function (genre) {
    return res.status(200).json(genre);
  }).catch(function (error) {
    return res.status(500).json(error);
  });
};

var create = function create(req, res) {
  Platform.create(req.body).then(function (newPlatform) {
    return res.status(200).json(newPlatform);
  }).catch(function (error) {
    return res.status(500).json(error);
  });
};

var show = function show(req, res) {
  Platform.findById(req.params.id).then(function (author) {
    return res.status(200).json(author);
  }).catch(function (error) {
    return res.status(500).json(error);
  });
};

var update = function update(req, res) {
  Platform.update(req.body, { where: { id: req.params.id } }).then(function (updatedRecords) {
    return res.status(200).json(updatedRecords);
  }).catch(function (error) {
    return res.status(500).json(error);
  });
};

var destroy = function destroy(req, res) {
  Platform.destroy({ where: { id: req.params.id } }).then(function (deletedRecords) {
    return res.status(200).json(deletedRecords);
  }).catch(function (error) {
    return res.status(500).json(error);
  });
};

exports.default = index;
exports.index = index;
exports.create = create;
exports.show = show;
exports.update = update;
exports.destroy = destroy;