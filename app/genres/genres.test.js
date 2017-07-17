import Chai from 'Chai';
import ChaiHttp from 'Chai-http';
import Server from '../server';
import Db from '../db';

const expect = Chai.expect;
const Genre = Db.Genre;

Chai.use(ChaiHttp);

describe('Genre', () => {
  before(function () {
    return Db.sequelize.sync();
  });

  beforeEach(function () {
    return Genre.destroy({where: {}});
  });

  describe('GET genres', () => {
    it('it should GET zero genres', done => {
      Chai
        .request(Server)
        .get('/api/genres')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.equal(0);
          done();
        });
    });

    it('it should GET some genres', done => {
      let id;

      Genre
        .bulkCreate([
          {name: 'Tiro em Primeira Pessoa'},
          {name: 'Esporte'},
          {name: 'Quebra-cabeça'},
        ])
        .then(newGenres => {
          Chai
            .request(Server)
            .get('/api/genres')
            .end((err, res) => {
              expect(res).to.have.deep.property('status', 200);
              expect(res.body).to.be.an('array');
              expect(res.body.length).to.be.equal(3);
              done();
            });
        });
    });
  });

  describe('POST genres', () => {
    it('it should POST a new genre', done => {
      Chai
        .request(Server)
        .post('/api/genres')
        .send({name: 'Plataforma'})
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.include({name: 'Plataforma'});
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('createdAt');
          expect(res.body).to.have.property('updatedAt');
          done();
        });
    });
  });

  describe('PUT genres', () => {
    it('it should PUT updated data in a genre', done => {
      let id;

      Genre
        .create({name: 'Plataforma'})
        .then(newGenre => {
          id = newGenre.id;

          Chai
            .request(Server)
            .put('/api/genres/' + id)
            .send({name: 'Estratégia'})
            .end((err, res) => {
              expect(res).to.have.deep.property('status', 200);
              expect(res.body).to.be.an('array').that.does.include(1);
              done();
            });
        });
    });
  });

  describe('DELETE genres', () => {
    it('it should DELETE a genre', done => {
      let id;

      Genre
        .create({name: 'Plataforma'})
        .then(newGenre => {
          id = newGenre.id;

          Chai
            .request(Server)
            .delete('/api/genres/' + id)
            .end((err, res) => {
              expect(res).to.have.deep.property('status', 200);
              expect(res.body).to.equal(1);
              done();
            });
        });
    });
  });
});
