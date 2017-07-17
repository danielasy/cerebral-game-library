import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import db from '../db';

const expect = chai.expect;
const Platform = db.Platform;

chai.use(chaiHttp);

describe('Platform', () => {
  before(function () {
    return db.sequelize.sync();
  });

  beforeEach(function () {
    return Platform.destroy({where: {}});
  });

  describe('GET platforms', () => {
    it('it should GET zero platforms', done => {
      chai
        .request(server)
        .get('/api/platforms')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.equal(0);
          done();
        });
    });

    it('it should GET some platforms', done => {
      let id;

      Platform
        .bulkCreate([
          {name: 'PlayStation 3'},
          {name: 'PlayStation 4'},
          {name: 'Nintendo 3DS'},
        ])
        .then(newPlatforms => {
          chai
            .request(server)
            .get('/api/platforms')
            .end((err, res) => {
              expect(res).to.have.deep.property('status', 200);
              expect(res.body).to.be.an('array');
              expect(res.body.length).to.be.equal(3);
              done();
            });
        });
    });
  });

  describe('POST platforms', () => {
    it('it should POST a new platform', done => {
      chai
        .request(server)
        .post('/api/platforms')
        .send({name: 'PlayStation 4'})
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.include({name: 'PlayStation 4'});
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('createdAt');
          expect(res.body).to.have.property('updatedAt');
          done();
        });
    });
  });

  describe('PUT platforms', () => {
    it('it should PUT updated data in a platform', done => {
      let id;

      Platform
        .create({name: 'PlayStation 4'})
        .then(newPlatform => {
          id = newPlatform.id;

          chai
            .request(server)
            .put('/api/platforms/' + id)
            .send({name: 'PlayStation 3'})
            .end((err, res) => {
              expect(res).to.have.deep.property('status', 200);
              expect(res.body).to.be.an('array').that.does.include(1);
              done();
            });
        });
    });
  });

  describe('DELETE platforms', () => {
    it('it should DELETE a platform', done => {
      let id;

      Platform
        .create({name: 'PlayStation 4'})
        .then(newPlatform => {
          id = newPlatform.id;

          chai
            .request(server)
            .delete('/api/platforms/' + id)
            .end((err, res) => {
              expect(res).to.have.deep.property('status', 200);
              expect(res.body).to.equal(1);
              done();
            });
        });
    });
  });
});
