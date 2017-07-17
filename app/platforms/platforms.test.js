import Chai from 'Chai';
import ChaiHttp from 'Chai-http';
import Server from '../server';
import Db from '../db';

const expect = Chai.expect;
const Platform = Db.Platform;

Chai.use(ChaiHttp);

describe('Platform', () => {
  before(function () {
    return Db.sequelize.sync();
  });

  beforeEach(function () {
    return Platform.destroy({where: {}});
  });

  describe('GET platforms', () => {
    it('it should GET zero platforms', done => {
      Chai
        .request(Server)
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
          Chai
            .request(Server)
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
      Chai
        .request(Server)
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

          Chai
            .request(Server)
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

          Chai
            .request(Server)
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
