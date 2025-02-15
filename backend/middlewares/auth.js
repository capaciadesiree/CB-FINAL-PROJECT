exports.isAuthenticated = (req, res, next) => {
  console.log('Auth check - Session:', req.session);
  console.log('Auth middleware - User:', req.user);
  console.log('Auth check - isAuthenticated:', req.isAuthenticated());
  
   if (!req.isAuthenticated()) {
    console.log('User not authenticated');
    return res.status(401).json({ message: 'Not authenticated' });
  }
  
  console.log('User authenticated');
  next();
};
