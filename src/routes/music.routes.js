const express = require("express");

const musicController = require("../controllers/music.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const validationMiddleware = require("../middlewares/validators.middleware");

const multer = require("multer");
const uplode = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post(
	"/uplode",
	authMiddleware.authArtist,
	uplode.single("music"),
	musicController.createMusic,
);

router.get(
	"/",
	validationMiddleware.getAllMusicValidatorRules,
	authMiddleware.authUser,
	musicController.getAllMusics,
);

router.post("/album", authMiddleware.authArtist, musicController.createAlbum);

router.get("/album", authMiddleware.authUser, musicController.getAllAlbums);

router.get(
	"/album/:albumID",
	authMiddleware.authUser,
	musicController.getAlbumByID,
);

module.exports = router;
