import jwt from "jsonwebtoken";

const verifyUser = async (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    await jwt.verify(token, process.env.SECRET_KEY, (error, payload) => {
      if (error) {
        return res.status(401).json({ message: "Invalid token" });
      } else {
        req.userId = payload._doc._id;
        next();
      }
    });
  } catch (err) {
    console.error("Error at Middleware - VerifyUser", err);
  }
};

export default verifyUser;
