import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth.js';
import carRoutes from './routes/cars.js';
import dealerRoutes from './routes/dealers.js';
import testDriveRoutes from './routes/testdrives.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/dealers', dealerRoutes);
app.use('/api/test-drives', testDriveRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Car Showcase Backend running on http://localhost:${PORT}`);
  console.log(`API Documentation:`);
  console.log(`  - POST   /api/auth/login`);
  console.log(`  - POST   /api/auth/register`);
  console.log(`  - GET    /api/cars`);
  console.log(`  - POST   /api/cars (dealer)`);
  console.log(`  - GET    /api/dealers`);
  console.log(`  - POST   /api/test-drives (user)`);
  console.log(`  - GET    /api/health`);
});
