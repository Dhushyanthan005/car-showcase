import express from 'express';
import { 
  getDealers, 
  getDealerById,
  getDealerProfile 
} from '../controllers/dealerController.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getDealers);
router.get('/:id', getDealerById);

// Protected route - Dealers only
router.get('/profile/me', requireRole(['dealer']), getDealerProfile);

export default router;
