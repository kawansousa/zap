const express = require("express");
const UserController = require("../controllers/userController.js");
const WhatsappService = require("../services/whatsappService.js");
const UserService = require("../services/userService.js");

const router = express.Router();

const whatsappService = new WhatsappService();
const userService = new UserService(whatsappService);
const userController = new UserController(userService);

router.post("/register", userController.register.bind(userController));
router.post("/login", userController.login.bind(userController));
router.put("/update/:id", userController.updateUser.bind(userController));
router.get("/:id", userController.getUserById.bind(userController));
router.delete("/:id", userController.deleteUser.bind(userController));

module.exports = router;
