import bcrypt from 'bcrypt';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const usuarioSeed = async () => {
  try {
    // Verifica se os usuários já foram criados
    const existingUsers = await User.findAll();
    if (existingUsers.length > 0) {
      console.log('Usuários já existem no banco de dados.');
      return;
    }

    // Criação dos usuários
    const usersToCreate = [];

    const existingAdmin = await User.findOne({ where: { cargo: 1 } });
    const existingColaborador = await User.findOne({ where: { cargo: 2 } });
    const existingAluno = await User.findOne({ where: { cargo: 3 } });

    if (!existingAdmin) {
      const senhaAdmin = await bcrypt.hash(process.env.SENHA_ADMIN, 10);
      usersToCreate.push({
        matricula: 111,
        senha: senhaAdmin,
        nomeUser: 'Administrador',
        cargo: 1,
        status: true
      });
    }

    if (!existingColaborador) {
      const senhaColaborador = await bcrypt.hash(process.env.SENHA_COLABORADOR, 10);
      usersToCreate.push({
        matricula: 222,
        senha: senhaColaborador,
        nomeUser: 'Colaborador',
        cargo: 2,
        status: true
      });
    }

    if (!existingAluno) {
      const senhaAluno = await bcrypt.hash(process.env.SENHA_ALUNO, 10);
      usersToCreate.push({
        matricula: 333,
        senha: senhaAluno,
        nomeUser: 'Aluno',
        cargo: 3,
        status: true
      });
    }

    for (let i = 0; i < 20; i++) {
      const senha = await bcrypt.hash(process.env.SENHA_PADRAO, 10);
      const cargo = (i % 3) + 1;
      const status = i % 2 === 0;

      usersToCreate.push({
        matricula: 1000 + i,
        senha: senha,
        nomeUser: `Usuário ${i + 1}`,
        cargo: cargo,
        status: status
      });
    }

    const usersCreated = await User.bulkCreate(usersToCreate);
    console.log(`Usuários criados com sucesso: 23`);
  } catch (error) {
    console.error('Erro ao criar os usuários:', error);
  }
};

export default usuarioSeed;
