// index.js
import "dotenv/config"; // Automatically loads environment variables
import express from "express";
import cors from "cors";
import connection from "./config/dbConfig.js"; // Ensure file extensions are included in ES modules
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import { config } from "dotenv";
config();
const app = express();

// database connection
connection();

// middlewares
app.use(express.json());
// app.use(
// 	cors({
// 		origin: "*",
// 		methods: ["GET", "POST"],
// 		credentials: true,
// 	})
// );

const allowedOrigins = [
	"http://localhost:3000",
	`${process.env.ALLOW_ORIGIN_URL1}`,
	// Add more allowed origins as needed
];

const corsOptions = {
	origin: (origin, callback) => {
		if (allowedOrigins.includes(origin) || !origin) {
			callback(null, true); // Allow the request
		} else {
			callback(new Error("Not allowed by CORS")); // Reject the request
		}
	},
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Include more methods if needed
	credentials: true, // Allow cookies to be sent and received
	allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
};

app.use(cors(corsOptions));

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
