import User from "../Models/user.model.js";

export default async function authMiddleware(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }

  let authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const [, api_key] = authHeader.split(" ");
      const currentUser = await User.findOne({ api_key });

      if (currentUser && currentUser.role === "admin") {
        let { _id: userId } = currentUser;
        req.session.userId = userId;
        return next();
      }
    } catch (err) {
      return next(err);
    }
  }

  return res.status(401).json({
    success: false,
    message: "unauthorized access",
  });
}
