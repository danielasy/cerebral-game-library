'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _platforms = require('./platforms.controller');

var Controller = _interopRequireWildcard(_platforms);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = (0, _express.Router)();

router.route('/').get(Controller.index).post(Controller.create);

router.route('/:id').get(Controller.show).put(Controller.update).delete(Controller.destroy);

exports.default = router;