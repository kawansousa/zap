const router = require("express").Router();
const { authMiddleware } = require("../middlewares/auth");
const {
  createUser,
  getusers,
  loginUser,
  getUserById,
  updateUser,
} = require("../controllers/usuaios.controller");

router.post("/login", loginUser);
router.post("/", createUser);
router.get("/", authMiddleware, getusers);
router.get("/getUser/:id", authMiddleware, getUserById);
router.put("/:id", updateUser);

module.exports = router;
