const protectRoute = (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      return next();
    }
  } catch (error) {
    console.error("Error in protectUser: ", error.message);
    res.status(401).json({ error: "Unathorized" });
  }
};

export default protectRoute;
