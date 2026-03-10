const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const musicRoutes = require("./routes/music.routes");

const app = express();

const allowedOrigins = "http://localhost:3000";

app.use(express.json());

app.use(
	cors({
		origin: process.env.CLIENT_URL || allowedOrigins,
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		credentials: true,
		allowedHeaders: ["Content-Type", "Authorization"],
	}),
);

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/music", musicRoutes);

module.exports = app;
