import authService from "../services/auth.services.js";
import { validateAuth } from "../validations/auth.validation.js";

export const login = async (req, res) => {
	try {
		const { error } = validateAuth(req.body);
		if (error) return res.status(400).json({ message: error.details[0].message });

		const result = await authService.login(req.body);

		if (result.success) {
			return res.status(200).json({ data: result.token, message: "Logged in successfully" });
		} else {
			return res.status(401).json({ message: result.message });
		}
	} catch (error) {
		console.error("Error during login: ", error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};
