import Pedido from '../models/Pedido.js';
<<<<<<< Updated upstream
=======
import User from '../models/User.js';
>>>>>>> Stashed changes

class PedidoController {
  static async getAllEntities(req, res) {
    try {
      const pedidos = await Pedido.findAll();
      res.json(pedidos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar pedidos.' });
    }
  }

  static async getEntity(req, res) {
    try {
      const { id } = req.params;
      const pedido = await Pedido.findByPk(id);
      res.json(pedido);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar pedido.' });
    }
  }

  static async createEntity(req, res) {
    try {
      const { matricula, quantidadeItens, box, tipo, status, colaborador, assinatura, data, hora } = req.body;

<<<<<<< Updated upstream
      const createdPedido = await Pedido.create({ matricula, quantidadeItens, box, tipo, status, colaborador, assinatura, data, hora });
=======
      // Verifica se o usuário com a matrícula fornecida existe
      const user = await User.findOne({ where: { matricula } });
      if (!user) {
        return res.status(400).json({ error: 'Usuário não encontrado.' });
      }

      const createdPedido = await Pedido.create({ 
        matricula,
        quantidadeItens,
        box,
        tipo,
        status,
        colaborador,
        assinatura,
        data,
        hora 
      });
>>>>>>> Stashed changes

      res.status(201).json({ pedido: createdPedido });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar pedido.' });
    }
  }

  static async updateEntity(req, res) {
    try {
      const { numero } = req.params;
<<<<<<< Updated upstream
      const { quantidadeItens, box, tipo, status, colaborador, assinatura, data, hora } = req.body;

      await Pedido.update({ quantidadeItens, box, tipo, status, colaborador, assinatura, data, hora }, { where: { numero } });
=======
      const { quantidadeItens, box, tipo, status, colaborador, assinatura, data, hora, matricula } = req.body;

      // Verifica se o usuário com a matrícula fornecida existe
      const user = await User.findOne({ where: { matricula } });
      if (!user) {
        return res.status(400).json({ error: 'Usuário não encontrado.' });
      }

      // Atualiza o pedido
      await Pedido.update({ 
        quantidadeItens,
        box,
        tipo,
        status,
        colaborador,
        assinatura,
        data,
        hora 
      }, { where: { numero } });
>>>>>>> Stashed changes

      res.json({ message: 'Pedido atualizado com sucesso.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar pedido.' });
    }
  }

  static async deleteEntity(req, res) {
    try {
      const { numero } = req.params;
      await Pedido.destroy({ where: { numero } });
      res.json({ message: 'Pedido deletado com sucesso.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao deletar pedido.' });
    }
  }
<<<<<<< Updated upstream
=======

  static async getPedidosByMatricula(req, res) {
    try {
      const { matricula } = req.params;

      // Busca todos os pedidos associados à matrícula fornecida
      const pedidos = await Pedido.findAll({ where: { matricula } });

      res.json(pedidos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar pedidos.' });
    }
  }
>>>>>>> Stashed changes
}

export default PedidoController;
