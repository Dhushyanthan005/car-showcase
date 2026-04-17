import express from 'express';
import { 
  createTestDrive, 
  getTestDrives, 
  getTestDriveById, 
  updateTestDrive,
  deleteTestDrive 
} from '../controllers/testDriveController.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Protected routes - Users can create, dealers can view/update
router.post('/', authMiddleware, createTestDrive);
router.get('/', authMiddleware, getTestDrives);
router.get('/:id', authMiddleware, getTestDriveById);

// Dealer and admin can update status
router.put('/:id', requireRole(['dealer', 'admin']), updateTestDrive);
router.delete('/:id', requireRole(['dealer', 'admin']), deleteTestDrive);

export default router;
