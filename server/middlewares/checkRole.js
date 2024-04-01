export const checkRole = (requiredRoles) => async (req, res, next) => {
  try {
    const convertedRoles = requiredRoles.map((role) => role.toLowerCase());
    const userId = req.userId;
    const user = await User.findById(userId);

    const userRole = user.role;
    if (!convertedRoles.includes(userRole.toLowerCase())) {
      return res.status(403).json({ message: "You are unauthorized" });
    }
    next();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Authorization error occurred", err });
  }
};
