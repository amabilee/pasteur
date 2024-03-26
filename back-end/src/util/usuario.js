import bcrypt from 'bcrypt';
import Usuario from '../models/User.js'; // Certifique-se de que este caminho está correto para o seu modelo de usuário
import dotenv from 'dotenv';

dotenv.config(); // Carregar variáveis de ambiente do arquivo .env

const usuarioSeed = async () => {
  const existingUser = await Usuario.findOne();

  if (!existingUser) {
    try {
      // Criar o usuário administrador
      const senhaAdmin = await bcrypt.hash(process.env.SENHA_ADMIN, 10);
      await Usuario.create({
        id:1,
        matricula: 'admin',
        senha: senhaAdmin,
        NomeUser: 'Administrador',
        email: 'admin@',
<<<<<<< Updated upstream
        cargo: 'Admin',
=======
        cargo: 1,
>>>>>>> Stashed changes
        box: 123,
        periodo: '1',
      });

      // Criar o usuário aluno
      const senhaAluno = await bcrypt.hash(process.env.SENHA_ALUNO, 10);
      await Usuario.create({
<<<<<<< Updated upstream
=======
        id :3,
>>>>>>> Stashed changes
        matricula: 'aluno',
        senha: senhaAluno,
        NomeUser: 'Aluno',
        email: 'aluno@',
<<<<<<< Updated upstream
        cargo: 'Aluno',
=======
        cargo: 3,
>>>>>>> Stashed changes
        box: 456,
        periodo: '2',
      });

      // Criar o usuário colaborador
      const senhaColaborador = await bcrypt.hash(process.env.SENHA_COLABORADOR, 10);
      await Usuario.create({
<<<<<<< Updated upstream
=======
        id:2,
>>>>>>> Stashed changes
        matricula: 'colaborador',
        senha: senhaColaborador,
        NomeUser: 'Colaborador',
        email: 'colaborador@',
<<<<<<< Updated upstream
        cargo: 'Colaborador',
=======
        cargo: 2,
>>>>>>> Stashed changes
        box: 789,
        periodo: '3',
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
