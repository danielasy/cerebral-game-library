'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _games = require('./games/games.routes');

var _games2 = _interopRequireDefault(_games);

var _genres = require('./genres/genres.routes');

var _genres2 = _interopRequireDefault(_genres);

var _platforms = require('./platforms/platforms.routes');

var _platforms2 = _interopRequireDefault(_platforms);

var _reviews = require('./reviews/reviews.routes');

var _reviews2 = _interopRequireDefault(_reviews);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.use('/games', _games2.default);
router.use('/genres', _genres2.default);
router.use('/platforms', _platforms2.default);
router.use('/reviews', _reviews2.default);

exports.default = router;