// controllers/userController.js
import userService from "../services/user.services.js";

export const createUser = async (req, res) => {
	try {
		const result = await userService.createUser(req.body);

		if (result.success) {
			return res.status(201).json({ message: result.message });
		} else {
			return res.status(409).json({ message: result.message });
		}
	} catch (error) {
		console.error("Error during user creation: ", error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};
