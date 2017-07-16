import { Router } from 'express';
import * as Controller from './genres.controller'

const router = Router();

router
  .route('/')
  .get(Controller.index)
  .post(Controller.create);

router
  .route('/:id')
  .get(Controller.show)
  .put(Controller.update)
  .delete(Controller.destroy);

export default router;
