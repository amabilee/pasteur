import usuarioSeed from './usuario.js';
import familiaSeed from './familia.js';
import pedidoSeed from './pedido.js';

const seed = async () => {
  try {
    await usuarioSeed();
    await familiaSeed();
    await pedidoSeed();

    console.log('Semeação concluída com sucesso!');
  } catch (error) {
    console.error('Erro durante o processo de semeação:', error);
  }
};

export default seed;
