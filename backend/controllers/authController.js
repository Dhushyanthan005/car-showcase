import { findUserByEmail, addUser, sanitizeUser } from '../data/users.js';
import { getDealerByEmail } from '../data/dealers.js';
import { query } from '../db/index.js';

export const login = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    if (query) {
      const result = await query('SELECT * FROM users WHERE email = $1', [email]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        if (user.password !== password) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
        if (user.role !== role) {
          return res.status(401).json({ error: `Invalid role. User role is ${user.role}` });
        }
        return res.json({ 
          success: true, 
          user: { id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone }, 
          message: 'Login successful' 
        });
      } else {
         return res.status(401).json({ error: 'Invalid email or password' });
      }
    }
  } catch (err) {
    console.warn('DB query failed, falling back to in-memory:', err.message);
  }

  const user = findUserByEmail(email);

  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  if (user.role !== role) {
    return res.status(401).json({ error: `Invalid role. User role is ${user.role}` });
  }

  res.json({
    success: true,
    user: sanitizeUser(user),
    message: 'Login successful'
  });
};

export const register = async (req, res) => {
  const { email, password, name, role } = req.body;

  if (!email || !password || !name || !role) {
    return res.status(400).json({ error: 'Email, password, name, and role are required' });
  }

  try {
    if (query) {
      const existing = await query('SELECT * FROM users WHERE email = $1', [email]);
      if (existing.rows.length > 0) {
         return res.status(409).json({ error: 'User already exists with this email' });
      }
      
      const result = await query(
        `INSERT INTO users(name, email, password, role, phone) VALUES($1, $2, $3, $4, $5) RETURNING id, name, email, role, phone`,
        [name, email, password, role, '']
      );
      
      return res.status(201).json({
        success: true,
        user: result.rows[0],
        message: 'Registration successful'
      });
    }
  } catch (err) {
    console.warn('DB query failed, falling back to in-memory:', err.message);
  }

  // Check if user already exists
  if (findUserByEmail(email)) {
    return res.status(409).json({ error: 'User already exists with this email' });
  }

  const newUser = addUser({
    name,
    email,
    password,
    role,
    phone: ''
  });

  res.status(201).json({
    success: true,
    user: sanitizeUser(newUser),
    message: 'Registration successful'
  });
};

export const getProfile = (req, res) => {
  const user = req.user;
  
  if (!user) {
    return res.status(401).json({ error: 'No user found' });
  }

  res.json({
    success: true,
    user: { id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone }
  });
};
