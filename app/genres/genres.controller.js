import Models from '../db';

const Genre = Models.Genre;

const index = (req, res) => {
  Genre
    .findAll()
    .then(genre => res.status(200).json(genre))
    .catch(error => res.status(500).json(error));
};

const create = (req, res) => {
  Genre
    .create(req.body)
    .then(newGenre => res.status(200).json(newGenre))
    .catch(error => res.status(500).json(error));
};

const show = (req, res) => {
  Genre
    .findById(req.params.id)
    .then(author => res.status(200).json(author))
    .catch(error => res.status(500).json(error));
};

const update = (req, res) => {
  Genre
    .update(req.body, { where: { id: req.params.id } })
    .then(updatedRecords => res.status(200).json(updatedRecords))
    .catch(error => res.status(500).json(error));
};

const destroy = (req, res) => {
  Genre
    .destroy({ where: { id: req.params.id } })
    .then(deletedRecords => res.status(200).json(deletedRecords))
    .catch(error => res.status(500).json(error));
};

export default index;
export { index, create, show, update, destroy };
