import { User } from "../models/user.model.js";

const findUserByEmail = async (email) => {
	try {
		return await User.findOne({ email });
	} catch (error) {
		throw new Error("Database query failed");
	}
};

export default {
	findUserByEmail,
};
