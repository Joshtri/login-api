import bcrypt from "bcrypt";
import userRepository from "../repositories/auth.repository.js";

const login = async ({ email, password }) => {
	try {
		// Fetch user from the repository
		const user = await userRepository.findUserByEmail(email);
		if (!user) {
			return { success: false, message: "Invalid Email or Password" };
		}

		// Validate password
		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			return { success: false, message: "Invalid Email or Password" };
		}

		// Generate token
		const token = user.generateAuthToken();
		return { success: true, token };
	} catch (error) {
		throw error;
	}
};

export default { login };
