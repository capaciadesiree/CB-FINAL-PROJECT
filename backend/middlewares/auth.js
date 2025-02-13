exports.isAuthenticated = (req, res, next) => {
  console.log('Auth check - Session:', req.session);
  console.log('Auth check - isAuthenticated:', req.isAuthenticated());
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};