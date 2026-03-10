const { ImageKit } = require("@imagekit/nodejs");

const imagekitClint = new ImageKit({
	privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
	publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
	urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uplodeFile(file) {
	try {
		const result = await imagekitClint.files.upload({
			file,
			fileName: "music_" + Date.now(),
			folder: "/music_app",
		});

		return result;
	} catch (error) {
		console.error("Error uploading file:", error);
		return null;
	}
}

module.exports = {
	uplodeFile,
};
