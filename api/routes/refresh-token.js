const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { token } = req.body;
});

module.exports = router;
