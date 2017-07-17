import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import db from '../db';

const expect = chai.expect;
const Game = db.Game;
const Review = db.Review;

chai.use(chaiHttp);

describe('Review', () => {
  let gameId;

  before(function () {
    return db
      .sequelize
      .sync()
      .then(() => {
        return Game.create({
          title: 'Rocket League',
          year: new Date(2015),
          price: 36.99,
        })
        .then(newGame => {
          gameId = newGame.id;
          return gameId;
        });
      });
  });

  beforeEach(function () {
    return Review.destroy({where: {}});
  });

  describe('GET reviews', () => {
    it('it should GET zero reviews', done => {
      chai
        .request(server)
        .get('/api/reviews')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.equal(0);
          done();
        });
    });

    it('it should GET some reviews', done => {
      let id;

      Review
        .bulkCreate([
          {rating: 4.5, text: 'Recomendado', GameId: gameId},
        ])
        .then(newReviews => {
          chai
            .request(server)
            .get('/api/reviews')
            .end((err, res) => {
              expect(res).to.have.deep.property('status', 200);
              expect(res.body).to.be.an('array');
              expect(res.body.length).to.be.equal(1);
              done();
            });
        });
    });
  });

  describe('POST reviews', () => {
    it('it should POST a new review', done => {
      chai
        .request(server)
        .post('/api/reviews')
        .send({rating: 4.5, text: 'Recomendado', GameId: gameId})
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.include({rating: 4.5, text: 'Recomendado'});
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('createdAt');
          expect(res.body).to.have.property('updatedAt');
          done();
        });
    });
  });

  describe('PUT reviews', () => {
    it('it should PUT updated data in a review', done => {
      let id;

      Review
        .create({rating: 4.5, text: 'Recomendado', GameId: gameId})
        .then(newReview => {
          id = newReview.id;

          chai
            .request(server)
            .put('/api/reviews/' + id)
            .send({rating: 3.5, text: 'Gostei', GameId: gameId})
            .end((err, res) => {
              expect(res).to.have.deep.property('status', 200);
              expect(res.body).to.be.an('array').that.does.include(1);
              done();
            });
        });
    });
  });

  describe('DELETE reviews', () => {
    it('it should DELETE a review', done => {
      let id;

      Review
        .create({rating: 4.5, text: 'Recomendado', GameId: gameId})
        .then(newReview => {
          id = newReview.id;

          chai
            .request(server)
            .delete('/api/reviews/' + id)
            .end((err, res) => {
              expect(res).to.have.deep.property('status', 200);
              expect(res.body).to.equal(1);
              done();
            });
        });
    });
  });
});
