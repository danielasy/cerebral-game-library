'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroy = exports.update = exports.show = exports.create = exports.index = undefined;

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
      // Create new genres if necessary
      if (req.body.newGenres) {
        return Promise.all(req.body.newGenres.map(function (genre) {
          return _db2.default.Genre.create({ name: genre }, { transaction: t });
        })).then(function (newGenres) {
          var _req$body$genres;

          return (_req$body$genres = req.body.genres).push.apply(_req$body$genres, _toConsumableArray(newGenres.map(function (genre) {
            return genre.id;
          })));
        }).then(function () {
          return game;
        });
      }
      return game;
    }).then(function (game) {
      // Add genres
      if (req.body.genres) {
        return game.setGenres(req.body.genres, { transaction: t }).then(function () {
          return game;
        });
      }
      return game;
    }).then(function (game) {
      // Create new platforms if necessary
      if (req.body.newPlatforms) {
        return Promise.all(req.body.newPlatforms.map(function (platform) {
          return _db2.default.Platform.create({ name: platform }, { transaction: t });
        })).then(function (newPlatforms) {
          var _req$body$platforms;

          return (_req$body$platforms = req.body.platforms).push.apply(_req$body$platforms, _toConsumableArray(newPlatforms.map(function (platform) {
            return platform.id;
          })));
        }).then(function () {
          return game;
        });
      }
      return game;
    }).then(function (game) {
      // Add platform
      if (req.body.platforms) {
        return game.setPlatforms(req.body.platforms, { transaction: t }).then(function () {
          return game;
        });
      }
      return game;
    }).then(function (game) {
      // Add review
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