import express from 'express';
import {
    createChild,
  getAllChildren,
  getChildDetails,
  getChildUrls,
  getChildAlerts,
  blockUrl,
  unblockUrl,
  resetTimeSpent
} from '../controllers/parentController.js';
import { verifyParentToken } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyParentToken);
router.post('/children', authMiddleware, createChild);
router.get('/children', getAllChildren);
router.get('/children/:id', getChildDetails);
router.get('/children/:id/urls', getChildUrls);
router.get('/children/:id/alerts', getChildAlerts);
router.post('/children/:id/block', blockUrl);
router.post('/children/:id/unblock', unblockUrl);
router.post('/children/:id/reset', resetTimeSpent);

export default router;
