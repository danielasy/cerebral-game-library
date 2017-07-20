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
var Platform = _db2.default.Platform;

_chai2.default.use(_chaiHttp2.default);

describe('Platform', function () {
  before(function () {
    return _db2.default.sequelize.sync();
  });

  beforeEach(function () {
    return Platform.destroy({ where: {} });
  });

  describe('GET platforms', function () {
    it('it should GET zero platforms', function (done) {
      _chai2.default.request(_index2.default).get('/api/platforms').end(function (err, res) {
        expect(res).to.have.deep.property('status', 200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(0);
        done();
      });
    });

    it('it should GET some platforms', function (done) {
      var id = void 0;

      Platform.bulkCreate([{ name: 'PlayStation 3' }, { name: 'PlayStation 4' }, { name: 'Nintendo 3DS' }]).then(function (newPlatforms) {
        _chai2.default.request(_index2.default).get('/api/platforms').end(function (err, res) {
          expect(res).to.have.deep.property('status', 200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.equal(3);
          done();
        });
      });
    });
  });

  describe('POST platforms', function () {
    it('it should POST a new platform', function (done) {
      _chai2.default.request(_index2.default).post('/api/platforms').send({ name: 'PlayStation 4' }).end(function (err, res) {
        expect(res).to.have.deep.property('status', 200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.include({ name: 'PlayStation 4' });
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('createdAt');
        expect(res.body).to.have.property('updatedAt');
        done();
      });
    });
  });

  describe('PUT platforms', function () {
    it('it should PUT updated data in a platform', function (done) {
      var id = void 0;

      Platform.create({ name: 'PlayStation 4' }).then(function (newPlatform) {
        id = newPlatform.id;

        _chai2.default.request(_index2.default).put('/api/platforms/' + id).send({ name: 'PlayStation 3' }).end(function (err, res) {
          expect(res).to.have.deep.property('status', 200);
          expect(res.body).to.be.an('array').that.does.include(1);
          done();
        });
      });
    });
  });

  describe('DELETE platforms', function () {
    it('it should DELETE a platform', function (done) {
      var id = void 0;

      Platform.create({ name: 'PlayStation 4' }).then(function (newPlatform) {
        id = newPlatform.id;

        _chai2.default.request(_index2.default).delete('/api/platforms/' + id).end(function (err, res) {
          expect(res).to.have.deep.property('status', 200);
          expect(res.body).to.equal(1);
          done();
        });
      });
    });
  });
});