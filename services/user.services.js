// services/userService.js
import bcrypt from "bcrypt";
import userRepository from "../repositories/user.repository.js";
import { validate } from "../models/user.model.js";

const createUser = async (userData) => {
	try {
		const { error } = validate(userData);
		if (error) return { success: false, message: error.details[0].message };

		const existingUser = await userRepository.findUserByEmail(userData.email);
		if (existingUser) {
			return { success: false, message: "User with given email already exists!" };
		}

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashedPassword = await bcrypt.hash(userData.password, salt);

		const newUser = await userRepository.createUser({
			...userData,
			password: hashedPassword,
		});
		
		return { success: true, message: "User created successfully" };
	} catch (error) {
		throw new Error("Service operation failed");
	}
};

export default {
	createUser,
};
