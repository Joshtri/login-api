// index.js
import "dotenv/config"; // Automatically loads environment variables
import express from "express";
import cors from "cors";
import connection from "./db.js"; // Ensure file extensions are included in ES modules
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

const app = express();

// database connection
connection();

// middlewares
app.use(express.json());
app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST"],
		credentials: true,
	})
);

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
