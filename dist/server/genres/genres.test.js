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
var Genre = _db2.default.Genre;

_chai2.default.use(_chaiHttp2.default);

describe('Genre', function () {
  before(function () {
    return _db2.default.sequelize.sync();
  });

  beforeEach(function () {
    return Genre.destroy({ where: {} });
  });

  describe('GET genres', function () {
    it('it should GET zero genres', function (done) {
      _chai2.default.request(_index2.default).get('/api/genres').end(function (err, res) {
        expect(res).to.have.deep.property('status', 200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(0);
        done();
      });
    });

    it('it should GET some genres', function (done) {
      var id = void 0;

      Genre.bulkCreate([{ name: 'Tiro em Primeira Pessoa' }, { name: 'Esporte' }, { name: 'Quebra-cabeça' }]).then(function (newGenres) {
        _chai2.default.request(_index2.default).get('/api/genres').end(function (err, res) {
          expect(res).to.have.deep.property('status', 200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.equal(3);
          done();
        });
      });
    });
  });

  describe('POST genres', function () {
    it('it should POST a new genre', function (done) {
      _chai2.default.request(_index2.default).post('/api/genres').send({ name: 'Plataforma' }).end(function (err, res) {
        expect(res).to.have.deep.property('status', 200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.include({ name: 'Plataforma' });
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('createdAt');
        expect(res.body).to.have.property('updatedAt');
        done();
      });
    });
  });

  describe('PUT genres', function () {
    it('it should PUT updated data in a genre', function (done) {
      var id = void 0;

      Genre.create({ name: 'Plataforma' }).then(function (newGenre) {
        id = newGenre.id;

        _chai2.default.request(_index2.default).put('/api/genres/' + id).send({ name: 'Estratégia' }).end(function (err, res) {
          expect(res).to.have.deep.property('status', 200);
          expect(res.body).to.be.an('array').that.does.include(1);
          done();
        });
      });
    });
  });

  describe('DELETE genres', function () {
    it('it should DELETE a genre', function (done) {
      var id = void 0;

      Genre.create({ name: 'Plataforma' }).then(function (newGenre) {
        id = newGenre.id;

        _chai2.default.request(_index2.default).delete('/api/genres/' + id).end(function (err, res) {
          expect(res).to.have.deep.property('status', 200);
          expect(res.body).to.equal(1);
          done();
        });
      });
    });
  });
});