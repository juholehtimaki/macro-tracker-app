const router = require("express").Router();
const user = require("../models/user");
const ensureRole = require("../middleware/jwt-middle").ensureRole;
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const user = { _id: "123", username: "moi", role: "user" };
  const token = generateUserToken(user);
  res.setHeader("Set-Cookie", `token=${token}; HttpOnly`);
  res.json(token);
});

router.get("/readtoken", ensureRole("user"), (req, res) => {
  res.json(req.token);
});

module.exports = router;

function generateUserToken(user) {
  return jwt.sign(
    { uid: user._id, username: user.username, role: user.role },
    "ASDASD123",
    {
      expiresIn: 1000 * 60 * 60 //ONE HOUR
    }
  );
}
