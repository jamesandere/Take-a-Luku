const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  // const token = req.headers["x-auth-token"];
  const token = req.cookies?.token;

  if (!token) return res.status(401).send("Access denied. Not authenticated.");

  try {
    const user = jwt.verify(token, process.env.JWT_SEC);
    req.user = await User.findById(user.id);

    next();
  } catch (error) {
    res.clearCookie("token");
    res.status(400).send("Access denied. Invalid token!");
  }
};

const isAdmin = async (req, res, next) => {
  auth(req, res, () => {
    if (req.user.role === 1) {
      next();
    } else {
      res.status(403).send("Access denied. Not authorized!");
    }
  });
};

const isUser = async (req, res, next) => {
  try {
    auth(req, res, () => {
      if (req.user) {
        next();
      }
    });
  } catch (error) {
    res.status(401).send("Not authenticated!");
  }
};

module.exports = { auth, isAdmin, isUser };
