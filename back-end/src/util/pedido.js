import Pedido from '../models/Pedido.js';

const pedidoSeed = async () => {
  try {
    const existingPedidos = await Pedido.findAll();
    if (existingPedidos.length > 0) {
      console.log('Já existem pedidos no banco de dados.');
      return;
    }

    const pedidosToCreate = [];

    for (let i = 0; i < 20; i++) {
      const novoPedido = {
        matricula: 123456 + i,
        nomeAluno: `Aluno ${i + 1}`,
        periodoAluno: (i % 4) + 1,
        quantidadeItens: `${i + 1}`,
        familias: `Família ${i + 1}`,
        box:123 + i,
        tipo: `${i % 2 === 0 ? 'Entrada' : 'Saída'}`,
        status: 'Pendente',
        colaborador: 'Nome do Colaborador',
        assinatura: false,
      };

      pedidosToCreate.push(novoPedido);
    }

    const createdPedidos = await Pedido.bulkCreate(pedidosToCreate);
    console.log(`Foram criados 20 pedidos com sucesso.`);
  } catch (error) {
    console.error('Erro ao criar pedidos:', error);
  }
};

export default pedidoSeed;
