exports.isAuthenticated = (req, res, next) => {
  console.log('Auth check - Session:', req.session);
  console.log('Auth check - User:', req.user);
  console.log('Auth check - SessionID:', req.sessionID);

  if (!req.session || !req.session.user) {
    console.log('No session or user');
    return res.status(401).json({ message: 'No session' });
  }

  if (!req.isAuthenticated()) {
    console.log('Not authenticated');
    return res.status(401).json({ message: 'Not authenticated' });
  }

  next();
};
