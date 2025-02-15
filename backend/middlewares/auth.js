exports.isAuthenticated = (req, res, next) => {
  console.log('Checking auth:', {
    sessionID: req.sessionID,
    session: req.session,
    user: req.user,
    isAuthenticated: req.isAuthenticated()
  });

  if (!req.sessionID || !req.session) {
    return res.status(401).json({ message: 'No session' });
  }

  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  next();
};
