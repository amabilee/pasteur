import Familia from '../models/Familia.js'; // Certifique-se de que o caminho para o seu modelo de Família está correto

const familiaSeed = async () => {
  try {
    // Verifica se já existe alguma família no banco de dados
    const existingFamilia = await Familia.findOne();

    // Se não houver família, cria algumas famílias de exemplo
    if (!existingFamilia) {
      await Familia.bulkCreate([
        {
          id: 1,
          nome: 'Família A',
          quantidadeBASE: '10',
          quantidadeMAX: '20',
          quantidadeMIN: '5',
        },
        {
          id : 2,
          nome: 'Família B',
          quantidadeBASE: '15',
          quantidadeMAX: '25',
          quantidadeMIN: '8',
        },
        {
          id : 3,
          nome: 'Família C',
          quantidadeBASE: '20',
          quantidadeMAX: '30',
          quantidadeMIN: '10',
        },
      ]);

      console.log('Semente de família criada com sucesso!');
    } else {
      console.log('Já existe pelo menos uma família no banco de dados.');
    }
  } catch (error) {
    console.error('Erro ao criar semente de família:', error);
  }
};

export default familiaSeed;