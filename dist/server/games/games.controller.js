'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroy = exports.update = exports.show = exports.create = exports.index = undefined;

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Game = _db2.default.Game;

var index = function index(req, res) {
  Game.findAll({
    include: [{ model: _db2.default.Genre, as: 'genres', attributes: ['name'], required: false }, { model: _db2.default.Platform, as: 'platforms', attributes: ['name'], required: false }, { model: _db2.default.Review, attributes: ['rating', 'text'], required: false }]
  }).then(function (game) {
    return res.status(200).json(game);
  }).catch(function (error) {
    return res.status(500).json(error);
  });
};

var create = function create(req, res) {
  _db2.default.sequelize.transaction(function (t) {
    return Game.create(req.body, { transaction: t }).then(function (game) {
      if (req.body.genres) {
        return game.setGenres(req.body.genres, { transaction: t }).then(function () {
          return game;
        });
      }
      return game;
    }).then(function (game) {
      if (req.body.platforms) {
        return game.setPlatforms(req.body.platforms, { transaction: t }).then(function () {
          return game;
        });
      }
      return game;
    }).then(function (game) {
      if (req.body.review) {
        return _db2.default.Review.create(req.body.review, { transaction: t }).then(function (newReview) {
          return game.setReview(newReview.id, { transaction: t }).then(function () {
            return game;
          });
        });
      }
      return game;
    });
  }).then(function (newGame) {
    return Game.findById(newGame.id, {
      include: [{ model: _db2.default.Genre, as: 'genres', attributes: ['name'], required: false }, { model: _db2.default.Platform, as: 'platforms', attributes: ['name'], required: false }, { model: _db2.default.Review, attributes: ['rating', 'text'], required: false }]
    });
  }).then(function (newGame) {
    return res.status(200).json(newGame);
  }).catch(function (error) {
    return res.status(500).json(error);
  });
};

var show = function show(req, res) {
  Game.findById(req.params.id, {
    include: [{ model: _db2.default.Genre, as: 'genres', attributes: ['name'], required: false }, { model: _db2.default.Platform, as: 'platforms', attributes: ['name'], required: false }, { model: _db2.default.Review, attributes: ['rating', 'text'], required: false }]
  }).then(function (game) {
    return res.status(200).json(game);
  }).catch(function (error) {
    return res.status(500).json(error);
  });
};

var update = function update(req, res) {
  _db2.default.sequelize.transaction(function (t) {
    return Game.update(req.body, { where: { id: req.params.id }, transaction: t }).then(function (updatedRecords) {
      if (req.body.genres) {
        return Game.findById(req.params.id).then(function (game) {
          return game.setGenres(req.body.genres, { transaction: t });
        }).then(function () {
          return updatedRecords;
        });
      }
      return updatedRecords;
    }).then(function (updatedRecords) {
      if (req.body.platforms) {
        return Game.findById(req.params.id).then(function (game) {
          return game.setPlatforms(req.body.platforms, { transaction: t });
        }).then(function () {
          return updatedRecords;
        });
      }
      return updatedRecords;
    }).then(function (updatedRecords) {
      if (req.body.review) {
        return Game.findById(req.params.id).then(function (game) {
          return game.setReview(req.body.review, { transaction: t });
        }).then(function () {
          return updatedRecords;
        });
      }
      return updatedRecords;
    });
  }).then(function (updatedRecords) {
    return res.status(200).json(updatedRecords);
  }).catch(function (error) {
    return res.status(500).json(error);
  });
};

var destroy = function destroy(req, res) {
  Game.destroy({ where: { id: req.params.id } }).then(function (deletedRecords) {
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