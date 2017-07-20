'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroy = exports.update = exports.show = exports.create = exports.index = undefined;

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Review = _db2.default.Review;

var index = function index(req, res) {
  Review.findAll().then(function (genre) {
    return res.status(200).json(genre);
  }).catch(function (error) {
    return res.status(500).json(error);
  });
};

var create = function create(req, res) {
  Review.create(req.body).then(function (newReview) {
    return res.status(200).json(newReview);
  }).catch(function (error) {
    return res.status(500).json(error);
  });
};

var show = function show(req, res) {
  Review.findById(req.params.id).then(function (author) {
    return res.status(200).json(author);
  }).catch(function (error) {
    return res.status(500).json(error);
  });
};

var update = function update(req, res) {
  Review.update(req.body, { where: { id: req.params.id } }).then(function (updatedRecords) {
    return res.status(200).json(updatedRecords);
  }).catch(function (error) {
    return res.status(500).json(error);
  });
};

var destroy = function destroy(req, res) {
  Review.destroy({ where: { id: req.params.id } }).then(function (deletedRecords) {
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