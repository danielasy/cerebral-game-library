import db from '../db';

const Game = db.Game;

const index = (req, res) => {
  Game
    .findAll({
      include: [
        {model: db.Genre, as: 'genres', attributes: ['name'], required: false},
        {model: db.Platform, as: 'platforms', attributes: ['name'], required: false},
        {model: db.Review, attributes: ['rating', 'text'], required: false},
      ]
    })
    .then(game => res.status(200).json(game))
    .catch(error => res.status(500).json(error));
};

const create = (req, res) => {
  db.sequelize.transaction((t) => {
    return Game.create(req.body, {transaction: t})
      .then(game => {
        if (req.body.genres) {
          return game
            .setGenres(req.body.genres, {transaction: t})
            .then(() => game);
        }
        return game;
      })
      .then(game => {
        if (req.body.platforms) {
          return game
            .setPlatforms(req.body.platforms, {transaction: t})
            .then(() => game);
        }
        return game;
      })
      .then(game => {
        if (req.body.review) {
          return game
            .setReview(req.body.review, {transaction: t})
            .then(() => game);
        }
        return game;
      });
  })
  .then(newGame => 
    Game
      .findById(newGame.id, {
        include: [
          {model: db.Genre, as: 'genres', attributes: ['name'], required: false},
          {model: db.Platform, as: 'platforms', attributes: ['name'], required: false},
          {model: db.Review, attributes: ['rating', 'text'], required: false},
        ]
      })
  )
  .then(newGame => res.status(200).json(newGame))
  .catch(error => res.status(500).json(error));
};

const show = (req, res) => {
  Game
    .findById(req.params.id, {
      include: [
        {model: db.Genre, as: 'genres', attributes: ['name'], required: false},
        {model: db.Platform, as: 'platforms', attributes: ['name'], required: false},
        {model: db.Review, attributes: ['rating', 'text'], required: false},
      ]
    })
    .then(game => res.status(200).json(game))
    .catch(error => res.status(500).json(error));
};

const update = (req, res) => {
  db.sequelize.transaction((t) => {
    return Game.update(req.body, {where: {id: req.params.id}, transaction: t})
      .then(updatedRecords => {
        if (req.body.genres) {
          return Game
            .findById(req.params.id)
            .then(game => game.setGenres(req.body.genres, {transaction: t}))
            .then(() => updatedRecords);
        }
        return updatedRecords;
      })
      .then(updatedRecords => {
        if (req.body.platforms) {
          return Game
            .findById(req.params.id)
            .then(game => game.setPlatforms(req.body.platforms, {transaction: t}))
            .then(() => updatedRecords);
        }
        return updatedRecords;
      })
      .then(updatedRecords => {
        if (req.body.review) {
          return Game
            .findById(req.params.id)
            .then(game => game.setReview(req.body.review, {transaction: t}))
            .then(() => updatedRecords);
        }
        return updatedRecords;
      });
  })
  .then(updatedRecords => res.status(200).json(updatedRecords))
  .catch(error => res.status(500).json(error));
};

const destroy = (req, res) => {
  Game
    .destroy({ where: { id: req.params.id } })
    .then(deletedRecords => res.status(200).json(deletedRecords))
    .catch(error => res.status(500).json(error));
};

export default index;
export { index, create, show, update, destroy };
