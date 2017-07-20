'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;
var Game = _db2.default.Game;
var Genre = _db2.default.Genre;
var Platform = _db2.default.Platform;

_chai2.default.use(_chaiHttp2.default);

describe('Game', function () {
  var genreId = void 0;
  var platformId = void 0;

  before(function () {
    return _db2.default.sequelize.sync().then(function () {
      Genre.create({ name: 'Estratégia' }).then(function (newGenre) {
        genreId = newGenre.id;
        Platform.create({ name: 'XBOX One' }).then(function (newPlatform) {
          platformId = newPlatform.id;
          return platformId;
        });
      });
    });
  });

  beforeEach(function () {
    return Game.destroy({ where: {} });
  });

  describe('GET games', function () {
    it('it should GET zero games', function (done) {
      _chai2.default.request(_index2.default).get('/api/games').end(function (err, res) {
        expect(res).to.have.deep.property('status', 200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(0);
        done();
      });
    });

    it('it should GET some games', function (done) {
      var id = void 0;

      Game.bulkCreate([{
        title: 'Jogo 1',
        release: '2014-01-01',
        price: 79.99
      }, {
        title: 'Jogo 2',
        release: '2015-01-01',
        price: 59.99
      }]).then(function (newGames) {
        _chai2.default.request(_index2.default).get('/api/games').end(function (err, res) {
          expect(res).to.have.deep.property('status', 200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.equal(2);
          done();
        });
      });
    });
  });

  describe('POST games', function () {
    it('it should POST a new game', function (done) {
      _chai2.default.request(_index2.default).post('/api/games').send({ title: 'Rocket League', release: '2015-01-01', price: 36.99 }).end(function (err, res) {
        expect(res).to.have.deep.property('status', 200);
        expect(res.body).to.be.an('object');
        // expect(res.body).to.include({rating: 4.5, text: 'Recomendado'});
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('createdAt');
        expect(res.body).to.have.property('updatedAt');
        done();
      });
    });
  });

  describe('PUT games', function () {
    it('it should PUT updated data in a game', function (done) {
      var id = void 0;

      Game.create({ title: 'Rocket League', release: '2015-01-01', price: 36.99 }).then(function (newGame) {
        id = newGame.id;

        _chai2.default.request(_index2.default).put('/api/games/' + id).send({ title: 'Rocket League ®', release: '2015-01-01', price: 46.99 }).end(function (err, res) {
          expect(res).to.have.deep.property('status', 200);
          expect(res.body).to.be.an('array').that.does.include(1);
          done();
        });
      });
    });
  });

  describe('DELETE games', function () {
    it('it should DELETE a game', function (done) {
      var id = void 0;

      Game.create({ title: 'Rocket League', release: '2015-01-01', price: 36.99 }).then(function (newGame) {
        id = newGame.id;

        _chai2.default.request(_index2.default).delete('/api/games/' + id).end(function (err, res) {
          expect(res).to.have.deep.property('status', 200);
          expect(res.body).to.equal(1);
          done();
        });
      });
    });
  });
});