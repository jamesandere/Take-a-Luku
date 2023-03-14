const { auth, isAdmin, isUser } = require("../middleware/auth");
const User = require("../models/user");
const router = require("express").Router();
const ErrorResponse = require("../utils/ErrorResponse");

router.get("/profile", isUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(new ErrorResponse(`User with id ${req.params.id} is not found`, 404));
  }
});

router.get("/", isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
