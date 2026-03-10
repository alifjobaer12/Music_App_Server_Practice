const albumModel = require("../models/album.model");
const musicModel = require("../models/music.model");

const jwt = require("jsonwebtoken");

const { uplodeFile } = require("../services/storage.service");

async function createMusic(req, res) {
	const { title } = req.body;
	const file = req.file;

	if (!file) {
		return res.status(400).json({ message: "No file uploaded" });
	}

	const result = await uplodeFile(file.buffer.toString("base64"));

	if (!result) {
		return res.status(500).json({ message: "Error uploading file" });
	}

	const newMusic = await musicModel.create({
		title,
		uri: result.url,
		artist: req.user.id,
	});

	res.status(201).json({
		message: "Music created successfully",
		music: {
			id: newMusic._id,
			title: newMusic.title,
			uri: newMusic.uri,
			artist: newMusic.artist,
		},
	});
}

async function createAlbum(req, res) {
	const { title, musics } = req.body;

	const newAlbum = await albumModel.create({
		title,
		musics,
		artist: req.user.id,
	});

	res.status(201).json({
		message: "Album created successfully",
		album: {
			id: newAlbum._id,
			title: newAlbum.title,
			musics: newAlbum.musics,
			artist: newAlbum.artist,
		},
	});
}

async function getAllMusics(req, res) {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;

	const skip = (page - 1) * limit;

	const musics = await musicModel
		.find()
		.skip(skip)
		.limit(limit)
		.populate("artist", "username, email");

	res.status(200).json({
		message: "Musics retrieved successfully",
		music: musics,
	});
}

async function getAllAlbums(req, res) {
	const albums = await albumModel
		.find()
		.select("title artist")
		.populate("artist", "username, email");

	res.status(200).json({
		message: "Albums retrieved successfully",
		albums,
	});
}

async function getAlbumByID(req, res) {
	const { albumID } = req.params;

	const album = await albumModel
		.findById(albumID)
		.populate("musics")
		.populate("artist", "username, email");

	if (!album) {
		return res.status(404).json({ message: "Album not found" });
	}

	res.status(200).json({
		message: "Album retrieved successfully",
		album: album,
	});
}

module.exports = {
	createMusic,
	createAlbum,
	getAllMusics,
	getAllAlbums,
	getAlbumByID,
};
