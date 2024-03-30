import bcrypt from 'bcrypt';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const usuarioSeed = async () => {
  const existingUser = await User.findOne();

  if (!existingUser) {
    try {
      const senhaAdmin = await bcrypt.hash(process.env.SENHA_ADMIN, 10);
      await User.create({
        matricula: 111,
        senha: senhaAdmin,
        nomeUser: 'Administrador',
        cargo: 1,
      });

      const senhaAluno = await bcrypt.hash(process.env.SENHA_ALUNO, 10);
      await User.create({
        matricula: 333,
        senha: senhaAluno,
        nomeUser: 'Aluno',
        cargo: 2,
      });

      const senhaColaborador = await bcrypt.hash(process.env.SENHA_COLABORADOR, 10);
      await User.create({
        matricula: 222,
        senha: senhaColaborador,
        nomeUser: 'Colaborador',
        cargo: 3,
      });

      console.log('Usuários criados com sucesso!');
    } catch (error) {
      console.error('Erro ao criar os usuários:', error);
    }
  } else {
    console.log('Já existe pelo menos um usuário no banco de dados.');
  }
};

export default usuarioSeed;