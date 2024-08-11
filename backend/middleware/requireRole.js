const requireRole = roles => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.rank)) {
      return res
        .status(403)
        .json({ message: "Access denied: Insufficient permissions" });
    }
    next();
  };
};

export default requireRole;
