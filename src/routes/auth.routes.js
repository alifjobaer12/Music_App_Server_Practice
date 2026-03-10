const express = require("express");

const authController = require("../controllers/auth.controller");

const validationMiddleware = require("../middlewares/validators.middleware");

const router = express.Router();

router.post(
	"/register",
	validationMiddleware.registerValidatorRules,
	authController.registerUser,
);

router.post("/login", authController.loginUser);

router.post("/logout", authController.logoutUser);

module.exports = router;
