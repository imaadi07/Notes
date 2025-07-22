exports.ensureAuth = (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      return next();
    }
  } catch (error) {
    res.status(401).json({ error: "Not Authenticated" });
  }
};
