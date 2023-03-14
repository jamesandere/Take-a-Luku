const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const ErrorResponse = require("../utils/ErrorResponse");

router.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      next(new ErrorResponse("Email or password required", 400));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 400));
    }

    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return next(new ErrorResponse("Invalid credentials", 400));
    }

    const token = await user.generateToken();
    const refreshToken = await user.generateRefreshToken();
    const options = {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
    };

    res.status(200).cookie("token", token, options).send({ token, user });
  } catch (error) {
    next(new ErrorResponse("Cannot log in, check your credentials", 400));
  }
});

// const saveTokenInCookie = async (user, statusCode, res) => {
//   const token = await user.generateToken();

//   const options = {
//     httpOnly: true,
//     expires: new Date(Date.now() + process.env.EXPIRES_TOKEN),
//   };

//   res.cookie("token", token, options);
//   res.status(statusCode).json({ success: true, token });
// };

module.exports = router;
