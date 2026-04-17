import { findUserByEmail, addUser, sanitizeUser } from '../data/users.js';
import { getDealerByEmail } from '../data/dealers.js';

export const login = (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
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

export const register = (req, res) => {
  const { email, password, name, role } = req.body;

  if (!email || !password || !name || !role) {
    return res.status(400).json({ error: 'Email, password, name, and role are required' });
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
    user: sanitizeUser(user)
  });
};
