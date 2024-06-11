import axios from "axios";

class LyceumController {
	static async login(matricula, senha) {
		try {
			const response = await axios.post(`${process.env.AUTH_API_URL}`,
				{
					"login": matricula,
					"password": senha
				},
				{
					"auth": {
						"username": process.env.AUTH_API_USERNAME,
						"password": process.env.AUTH_API_PASSWORD
					}
				});

			return response;
		} catch (error) {
			throw new Error(error?.response?.data?.titulo);
		}
	}
}

export default LyceumController;