import Chai from 'Chai';
import ChaiHttp from 'Chai-http';
import Server from '../server';
import Db from '../db';

const expect = Chai.expect;
const Game = Db.Game;
const Genre = Db.Genre;
const Platform = Db.Platform;

Chai.use(ChaiHttp);

describe('Game', () => {
  let genreId;
  let platformId;

  before(function () {
    return Db
      .sequelize
      .sync()
      .then(() => {
        Genre.create({name: 'Estratégia'})
        .then(newGenre => {
          genreId = newGenre.id;
          Platform.create({name: 'XBOX One'})
            .then((newPlatform) => {
              platformId = newPlatform.id;
              return platformId;
            });
        });
      });
  });

  beforeEach(function () {
    return Game.destroy({where: {}});
  });

  describe('GET games', () => {
    it('it should GET zero games', done => {
      Chai
        .request(Server)
        .get('/api/games')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.equal(0);
          done();
        });
    });

    it('it should GET some games', done => {
      let id;

      Game
        .bulkCreate([
          {
            title: 'Jogo 1',
            year: new Date(2014),
            price: '79.99',
          },
          {
            title: 'Jogo 2',
            year: new Date(2015),
            price: '59.99',
          },
        ])
        .then(newGames => {
          Chai
            .request(Server)
            .get('/api/games')
            .end((err, res) => {
              expect(res).to.have.deep.property('status', 200);
              expect(res.body).to.be.an('array');
              expect(res.body.length).to.be.equal(2);
              done();
            });
        });
    });
  });

  describe('POST games', () => {
    it('it should POST a new game', done => {
      Chai
        .request(Server)
        .post('/api/games')
        .send({title: 'Rocket League', year: new Date(2015), price: '36.99'})
        .end((err, res) => {
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

  describe('PUT games', () => {
    it('it should PUT updated data in a game', done => {
      let id;

      Game
        .create({title: 'Rocket League', year: new Date(2015), price: '36.99'})
        .then(newGame => {
          id = newGame.id;

          Chai
            .request(Server)
            .put('/api/games/' + id)
            .send({title: 'Rocket League ®', year: new Date(2015), price: '46.99'})
            .end((err, res) => {
              expect(res).to.have.deep.property('status', 200);
              expect(res.body).to.be.an('array').that.does.include(1);
              done();
            });
        });
    });
  });

  describe('DELETE games', () => {
    it('it should DELETE a game', done => {
      let id;

      Game
        .create({title: 'Rocket League', year: new Date(2015), price: '36.99'})
        .then(newGame => {
          id = newGame.id;

          Chai
            .request(Server)
            .delete('/api/games/' + id)
            .end((err, res) => {
              expect(res).to.have.deep.property('status', 200);
              expect(res.body).to.equal(1);
              done();
            });
        });
    });
  });
});
