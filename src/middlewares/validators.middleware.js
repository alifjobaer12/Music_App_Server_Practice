const { body, query, validationResult } = require("express-validator");

const registerValidatorRules = [
	body("username")
		.trim()
		.notEmpty()
		.withMessage("Name is required")
		.isLength({ min: 3 })
		.withMessage("Name must be at least 3 characters"),

	body("email")
		.trim()
		.notEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Invalid email format"),

	body("password")
		.notEmpty()
		.withMessage("Password is required")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters"),

	body("role")
		.optional()
		.isIn(["user", "artist"])
		.withMessage("Role must be user or artist"),

	registerValidator,
];

function registerValidator(req, res, next) {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	next();
}

const getAllMusicValidatorRules = [
	query("page")
		.optional()
		.isInt({ min: 1 })
		.withMessage("Page must be greater than 0"),

	query("limit")
		.optional()
		.isInt({ min: 1, max: 100 })
		.withMessage("Limit must be between 1 and 100"),

	query("search")
		.optional()
		.isString()
		.withMessage("Search must be a string"),

	query("sort")
		.optional()
		.isIn(["title", "artist", "createdAt"])
		.withMessage("Invalid sort field"),

	query("order")
		.optional()
		.isIn(["asc", "desc"])
		.withMessage("Order must be asc or desc"),

	getAllMusicValidator,
];

function getAllMusicValidator(req, res, next) {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	next();
}

module.exports = {
	registerValidatorRules,
	getAllMusicValidatorRules,
};
