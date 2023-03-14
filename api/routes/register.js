const User = require("../models/user");
const router = require("express").Router();
const ErrorResponse = require("../utils/ErrorResponse");

router.post("/", async (req, res, next) => {
  const { email } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    next(new ErrorResponse("User already exists", 400));
  }

  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    const token = await savedUser.generateToken();
    const refreshToken = await savedUser.generateRefreshToken();
    res.status(200).send({ token, refreshToken });
  } catch (error) {
    next(new ErrorResponse("Cannot sign up, check your credentials", 400));
  }
});

module.exports = router;
