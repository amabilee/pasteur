import usuarioSeed from './usuario.js'; // Importa a semente de usuário

const seed = async () => {
  console.log('Iniciando processo de semeação...');
  try {
    await usuarioSeed();

    console.log('Semeação concluída com sucesso!');
  } catch (error) {
    console.error('Erro durante o processo de semeação:', error);
  }
};
export default seed;
