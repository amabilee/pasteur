<<<<<<< Updated upstream
import usuarioSeed from './usuario.js'; // Importa a semente de usuário
import familiaSeed from './familia.js'; // Importa a semente de família
import pedidoSeed from './pedido.js';


const seed = async () => {
  console.log('Iniciando processo de semeação...');
  try {
    // Executa as sementes de usuário e família
    await usuarioSeed();
    await familiaSeed();
    await pedidoSeed();

    console.log('Semeação concluída com sucesso!');
  } catch (error) {
    console.error('Erro durante o processo de semeação:', error);
  }
};

// Exporta a função de semeação
=======
import usuarioSeed from './usuario.js';
import familiaSeed from './familia.js';

const seed = async () => {
  try {
    await usuarioSeed();
    await familiaSeed();

  } catch (error) {
    console.error('Erro no seed', error);
  }
};


>>>>>>> Stashed changes
export default seed;
