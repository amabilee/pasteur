//loginController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

class AuthController {
    static async login(req, res) {
        try {
            const { matricula, senha } = req.body;

            const foundUser = await User.findOne({ where: { matricula } });

            if (!foundUser) {
                return res.status(404).json({ error: 'Matrícula não encontrada.' });
            }

            const passwordMatch = await bcrypt.compare(senha, foundUser.senha);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Senha incorreta.' });
            }

            // Gere o token JWT
            const token = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

            res.status(200).json({token,matricula });
        } catch (error) {
            console.error(error);
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
