import { Router } from 'express';
import { proxyScoreController } from '../controllers/proxyController';

const router = Router();

router.get('/score', proxyScoreController);

export default router;
