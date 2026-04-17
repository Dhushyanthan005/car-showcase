// Auth middleware
export const authMiddleware = (req, res, next) => {
  const userData = req.headers['x-user'];
  
  if (!userData) {
    return res.status(401).json({ error: 'Unauthorized - No user data provided' });
  }

  try {
    const user = JSON.parse(userData);
    req.user = user;
    next();
  } catch {
    res.status(401).json({ error: 'Unauthorized - Invalid user data' });
  }
};

export const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    const userData = req.headers['x-user'];
    
    if (!userData) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const user = JSON.parse(userData);
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ error: 'Forbidden - Insufficient permissions' });
      }
      req.user = user;
      next();
    } catch {
      res.status(401).json({ error: 'Unauthorized' });
    }
  };
};
