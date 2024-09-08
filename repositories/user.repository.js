// repositories/userRepository.js
import { User } from "../models/user.model.js";

const findUserByEmail = async (email) => {
	try {
		return await User.findOne({ email });
	} catch (error) {
		throw new Error("Database query failed");
	}
};

const createUser = async (userData) => {
	try {
		const user = new User(userData);
		await user.save();
		return user;
	} catch (error) {
		throw new Error("Database operation failed");
	}
};

export default {
	findUserByEmail,
	createUser,
};
