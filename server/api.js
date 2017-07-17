import { Router } from 'express';
import Games from './games/games.routes';
import Genres from './genres/genres.routes';
import Platforms from './platforms/platforms.routes';
import Reviews from './reviews/reviews.routes';

const router = Router();

router.use('/games', Games);
router.use('/genres', Genres);
router.use('/platforms', Platforms);
router.use('/reviews', Reviews);

export default router;
