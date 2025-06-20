const isArtisan = (req, res, next) => {
  if (req.user && req.user.role === 'artisan') {
    next();
  } else {
    res.status(403).json({ message: 'Only artisans allowed' });
  }
};

module.exports = { isArtisan };
