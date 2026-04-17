import express from 'express';
import { 
  getAllCars, 
  getCarById, 
  createCar, 
  updateCarById, 
  deleteCarById,
  getCarsByDealer 
} from '../controllers/carController.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllCars);
router.get('/:id', getCarById);
router.get('/dealer/:dealer_id', getCarsByDealer);

// Protected routes - Dealer only
router.post('/', requireRole(['dealer', 'admin']), createCar);
router.put('/:id', requireRole(['dealer', 'admin']), updateCarById);
router.delete('/:id', requireRole(['dealer', 'admin']), deleteCarById);

export default router;
