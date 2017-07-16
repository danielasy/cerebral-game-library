import Models from '../db';

const Review = Models.Review;

const index = (req, res) => {
  Review
    .findAll()
    .then(genre => res.status(200).json(genre))
    .catch(error => res.status(500).json(error));
};

const create = (req, res) => {
  Review
    .create(req.body)
    .then(newReview => res.status(200).json(newReview))
    .catch(error => res.status(500).json(error));
};

const show = (req, res) => {
  Review
    .findById(req.params.id)
    .then(author => res.status(200).json(author))
    .catch(error => res.status(500).json(error));
};

const update = (req, res) => {
  Review
    .update(req.body, { where: { id: req.params.id } })
    .then(updatedRecords => res.status(200).json(updatedRecords))
    .catch(error => res.status(500).json(error));
};

const destroy = (req, res) => {
  Review
    .destroy({ where: { id: req.params.id } })
    .then(deletedRecords => res.status(200).json(deletedRecords))
    .catch(error => res.status(500).json(error));
};

export default index;
export { index, create, show, update, destroy };
