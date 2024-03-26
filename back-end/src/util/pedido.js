import pedido from '../models/Pedido.js'; // Certifique-se de que este caminho está correto para o seu modelo de pedido

const pedidoSeed = async () => {
  try {
    // Verifica se já existe algum pedido
    const existingPedido = await pedido.findOne();
    if (existingPedido) {
      console.log('Já existe pelo menos um pedido no banco de dados.');
      return;
    }

    // Crie um novo pedido
    const novoPedido = {
      matricula: 'admin', // Substitua pelo valor correto
      quantidadeItens: '10', // Substitua pelo valor correto
      box: 123, // Substitua pelo valor correto
      tipo: 'Tipo do pedido', // Substitua pelo valor correto
      status: 1, // Substitua pelo valor correto
      colaborador: 'Nome do colaborador', // Substitua pelo valor correto
      assinatura: false, // Substitua pelo valor correto
      data: new Date(), // Substitua pelo valor correto
      hora: new Date(), // Substitua pelo valor correto
    };

    // Crie o novo pedido no banco de dados
    const createdPedido = await pedido.create(novoPedido);
    console.log('Pedido inicial criado com sucesso:', createdPedido);
  } catch (error) {
    console.error('Erro ao criar pedido inicial:', error);
  }
};

export default pedidoSeed;
