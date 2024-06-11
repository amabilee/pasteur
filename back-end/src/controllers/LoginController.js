// loginController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import LyceumController from './LyceumController.js';

class AuthController {
	static async login(req, res) {
		try {
			const { matricula, senha } = req.body;

			if (!matricula || !senha) {
				return res.status(204).json({ error: 'Preencha todos os campos.' })
			}

			const foundUser = await User.findOne({ where: { matricula } });

			if (!foundUser) {
				return res.status(404).json({ error: 'Matrícula não encontrada.' });
			}

			if (foundUser.status == 0) {
				return res.status(404).json({ error: 'Usuário desativado.' });
			}

			// Gere o token JWT com expiração em três horas
			const token = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET_KEY, { expiresIn: '3h' });

			// 3 - Aluno: Autenticação em API externa
			if (foundUser.cargo === 3) {
				try {
					const response = await LyceumController.login(matricula, senha);

					if (response?.status === 200) {
						if (response?.data?.curso !== process.env.AUTH_API_CURSO) return res.status(403).json({ error: 'Usuário não matriculado no curso de Odontologia.' });

						if (response.data.situacaoAluno !== "Ativo") return res.status(403).json({ error: 'Usuário inativo no Lyceum.' });

						res.status(200).json({ token, matricula, cargo: foundUser.cargo, NomeUser: foundUser.nomeUser });
					} else {
						res.status(500).json({ error: 'Erro ao processar login.' });
					}

				} catch (error) {
					res.status(401).json({ error: error.message });
				}

			} else {
				const passwordMatch = await bcrypt.compare(senha, foundUser.senha);

				if (!passwordMatch) {
					return res.status(401).json({ error: 'Senha incorreta.' });
				}

				res.status(200).json({ token, matricula, cargo: foundUser.cargo, NomeUser: foundUser.nomeUser });
			}

		} catch (error) {
			if (error?.response?.status === 500) {
				return res.status(401).json({ error: 'Matrícula ou senha incorretos.' });
			}

			res.status(500).json({ error: 'Erro ao processar login.' });
		}
	}

	static async logout(req, res) {
		try {
			req.session.destroy((err) => {
				if (err) {
					console.error(err);
					return res.status(500).json({ error: 'Erro ao fazer logout.' });
				}
				res.status(200).json({ message: 'Logout bem-sucedido!' });
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Erro ao fazer logout.' });
		}
	}
}

export default AuthController;
