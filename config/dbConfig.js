// db.js
import mongoose from "mongoose";

const connection = async () => {
	try {
		await mongoose.connect(process.env.DB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("Could not connect to MongoDB", error);
	}
};

export default connection;
