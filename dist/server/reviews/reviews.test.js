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
var Review = _db2.default.Review;

_chai2.default.use(_chaiHttp2.default);

describe('Review', function () {
  var gameId = void 0;

  before(function () {
    return _db2.default.sequelize.sync().then(function () {
      return Game.create({
        title: 'Rocket League',
        year: new Date(2015),
        price: 36.99
      }).then(function (newGame) {
        gameId = newGame.id;
        return gameId;
      });
    });
  });

  beforeEach(function () {
    return Review.destroy({ where: {} });
  });

  describe('GET reviews', function () {
    it('it should GET zero reviews', function (done) {
      _chai2.default.request(_index2.default).get('/api/reviews').end(function (err, res) {
        expect(res).to.have.deep.property('status', 200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(0);
        done();
      });
    });

    it('it should GET some reviews', function (done) {
      var id = void 0;

      Review.bulkCreate([{ rating: 4.5, text: 'Recomendado', GameId: gameId }]).then(function (newReviews) {
        _chai2.default.request(_index2.default).get('/api/reviews').end(function (err, res) {
          expect(res).to.have.deep.property('status', 200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.equal(1);
          done();
        });
      });
    });
  });

  describe('POST reviews', function () {
    it('it should POST a new review', function (done) {
      _chai2.default.request(_index2.default).post('/api/reviews').send({ rating: 4.5, text: 'Recomendado', GameId: gameId }).end(function (err, res) {
        expect(res).to.have.deep.property('status', 200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.include({ rating: 4.5, text: 'Recomendado' });
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('createdAt');
        expect(res.body).to.have.property('updatedAt');
        done();
      });
    });
  });

  describe('PUT reviews', function () {
    it('it should PUT updated data in a review', function (done) {
      var id = void 0;

      Review.create({ rating: 4.5, text: 'Recomendado', GameId: gameId }).then(function (newReview) {
        id = newReview.id;

        _chai2.default.request(_index2.default).put('/api/reviews/' + id).send({ rating: 3.5, text: 'Gostei', GameId: gameId }).end(function (err, res) {
          expect(res).to.have.deep.property('status', 200);
          expect(res.body).to.be.an('array').that.does.include(1);
          done();
        });
      });
    });
  });

  describe('DELETE reviews', function () {
    it('it should DELETE a review', function (done) {
      var id = void 0;

      Review.create({ rating: 4.5, text: 'Recomendado', GameId: gameId }).then(function (newReview) {
        id = newReview.id;

        _chai2.default.request(_index2.default).delete('/api/reviews/' + id).end(function (err, res) {
          expect(res).to.have.deep.property('status', 200);
          expect(res.body).to.equal(1);
          done();
        });
      });
    });
  });
});