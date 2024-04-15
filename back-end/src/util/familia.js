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
          quantidadeBase: '10',
          quantidadeMAX: '20',
          quantidadeMIN: '5',
        },
        {
          id: 2,
          nome: 'Família B',
          quantidadeBase: '15',
          quantidadeMAX: '25',
          quantidadeMIN: '8',
        },
        {
          id: 3,
          nome: 'Família C',
          quantidadeBase: '20',
          quantidadeMAX: '30',
          quantidadeMIN: '10',
        },
        {
          id: 4,
          nome: 'Família D',
          quantidadeBase: '25',
          quantidadeMAX: '35',
          quantidadeMIN: '13',
        },
        {
          id: 5,
          nome: 'Família E',
          quantidadeBase: '30',
          quantidadeMAX: '40',
          quantidadeMIN: '16',
        },
        {
          id: 6,
          nome: 'Família F',
          quantidadeBase: '35',
          quantidadeMAX: '45',
          quantidadeMIN: '19',
        },
        {
          id: 7,
          nome: 'Família G',
          quantidadeBase: '40',
          quantidadeMAX: '50',
          quantidadeMIN: '22',
        },
        {
          id: 8,
          nome: 'Família H',
          quantidadeBase: '45',
          quantidadeMAX: '55',
          quantidadeMIN: '25',
        },
        {
          id: 9,
          nome: 'Família I',
          quantidadeBase: '50',
          quantidadeMAX: '60',
          quantidadeMIN: '28',
        },
        {
          id: 10,
          nome: 'Família J',
          quantidadeBase: '55',
          quantidadeMAX: '65',
          quantidadeMIN: '31',
        },
        {
          id: 11,
          nome: 'Família K',
          quantidadeBase: '60',
          quantidadeMAX: '70',
          quantidadeMIN: '34',
        },
        {
          id: 12,
          nome: 'Família L',
          quantidadeBase: '65',
          quantidadeMAX: '75',
          quantidadeMIN: '37',
        },
        {
          id: 13,
          nome: 'Família M',
          quantidadeBase: '70',
          quantidadeMAX: '80',
          quantidadeMIN: '40',
        },
        {
          id: 14,
          nome: 'Família N',
          quantidadeBase: '75',
          quantidadeMAX: '85',
          quantidadeMIN: '43',
        },
        {
          id: 15,
          nome: 'Família O',
          quantidadeBase: '80',
          quantidadeMAX: '90',
          quantidadeMIN: '46',
        },
        {
          id: 16,
          nome: 'Família P',
          quantidadeBase: '85',
          quantidadeMAX: '95',
          quantidadeMIN: '49',
        },
        {
          id: 17,
          nome: 'Família Q',
          quantidadeBase: '90',
          quantidadeMAX: '100',
          quantidadeMIN: '52',
        },
        {
          id: 18,
          nome: 'Família R',
          quantidadeBase: '95',
          quantidadeMAX: '105',
          quantidadeMIN: '55',
        },
        {
          id: 19,
          nome: 'Família S',
          quantidadeBase: '100',
          quantidadeMAX: '110',
          quantidadeMIN: '58',
        },
        {
          id: 20,
          nome: 'Família T',
          quantidadeBase: '105',
          quantidadeMAX: '115',
          quantidadeMIN: '61',
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
