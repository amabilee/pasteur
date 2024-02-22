import bcrypt from 'bcrypt';
import Usuario from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config(); // Carregar variáveis de ambiente do arquivo .env

const usuarioSeed = async () => {
  const existingUser = await Usuario.findOne();

  if (!existingUser) {
    try {
      const senhaCriptografada = await bcrypt.hash(process.env.SENHA_ADMIN, 10);

      await Usuario.create({
        matricula: 'admin',
        senha: senhaCriptografada,
      });

      console.log('Usuário criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  } else {
    console.log('Já existe pelo menos um usuário no banco de dados.');
  }
};

export default usuarioSeed;
