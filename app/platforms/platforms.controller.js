import Models from '../db';

const Platform = Models.Platform;

const index = (req, res) => {
  Platform
    .findAll()
    .then(genre => res.status(200).json(genre))
    .catch(error => res.status(500).json(error));
};

const create = (req, res) => {
  Platform
    .create(req.body)
    .then(newPlatform => res.status(200).json(newPlatform))
    .catch(error => res.status(500).json(error));
};

const show = (req, res) => {
  Platform
    .findById(req.params.id)
    .then(author => res.status(200).json(author))
    .catch(error => res.status(500).json(error));
};

const update = (req, res) => {
  Platform
    .update(req.body, { where: { id: req.params.id } })
    .then(updatedRecords => res.status(200).json(updatedRecords))
    .catch(error => res.status(500).json(error));
};

const destroy = (req, res) => {
  Platform
    .destroy({ where: { id: req.params.id } })
    .then(deletedRecords => res.status(200).json(deletedRecords))
    .catch(error => res.status(500).json(error));
};

export default index;
export { index, create, show, update, destroy };
