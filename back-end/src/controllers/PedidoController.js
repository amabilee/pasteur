import Pedido from '../models/Pedido.js';

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

      const createdPedido = await Pedido.create({ matricula, quantidadeItens, box, tipo, status, colaborador, assinatura, data, hora });

      res.status(201).json({ pedido: createdPedido });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar pedido.' });
    }
  }

  static async updateEntity(req, res) {
    try {
      const { numero } = req.params;
      const { quantidadeItens, box, tipo, status, colaborador, assinatura, data, hora } = req.body;

      await Pedido.update({ quantidadeItens, box, tipo, status, colaborador, assinatura, data, hora }, { where: { numero } });

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
}

export default PedidoController;
