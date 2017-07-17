import models from '../db';

const Game = models.Game;

const index = (req, res) => {
  Game
    .findAll()
    .then(genre => res.status(200).json(genre))
    .catch(error => res.status(500).json(error));
};

const create = (req, res) => {
  Game
    .create(req.body)
    .then(newGame => res.status(200).json(newGame))
    .catch(error => res.status(500).json(error));
};

const show = (req, res) => {
  Game
    .findById(req.params.id)
    .then(author => res.status(200).json(author))
    .catch(error => res.status(500).json(error));
};

const update = (req, res) => {
  Game
    .update(req.body, { where: { id: req.params.id } })
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
