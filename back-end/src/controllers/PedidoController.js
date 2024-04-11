import { Op } from 'sequelize';
import Pedido from '../models/Pedido.js';

class PedidoController {
  static async getAllEntities(req, res) {
    const { page = 1, limit = 10, status, matricula, nomeAluno, periodoAluno, quantidadeItens, familias, box, tipo, colaborador, assinatura } = req.query;

    try {
      const offset = (page - 1) * limit;
      const whereClause = {};

      const filters = [];

      if (status) {
        filters.push({ status });
      }

      if (matricula) {
        filters.push({ matricula });
      }

      if (nomeAluno) {
        filters.push({ nomeAluno });
      }

      if (periodoAluno) {
        filters.push({ periodoAluno });
      }

      if (quantidadeItens) {
        filters.push({ quantidadeItens });
      }

      if (familias) {
        filters.push({ familias });
      }

      if (box) {
        filters.push({ box });
      }

      if (tipo) {
        filters.push({ tipo });
      }

      if (colaborador) {
        filters.push({ colaborador });
      }

      if (assinatura) {
        filters.push({ assinatura });
      }

      if (filters.length > 0) {
        whereClause[Op.or] = filters;
      }

      const { count, rows: pedidos } = await Pedido.findAndCountAll({
        offset,
        limit: parseInt(limit),
        where: whereClause,
      });

      const totalPages = Math.ceil(count / limit);

      const pagination = {
        currentPage: parseInt(page),
        totalPages,
        totalItems: count,
      };

      res.json({ pedidos, pagination });
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
      const { matricula, quantidadeItens, nomeAluno, periodoAluno, familias, box, tipo, status, colaborador, assinatura } = req.body;

      const createdPedido = await Pedido.create({ matricula, periodoAluno, quantidadeItens, familias, nomeAluno, box, tipo, status, colaborador, assinatura });

      res.status(201).json({ pedido: createdPedido });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar pedido.' });
    }
  }

  static async updateEntity(req, res) {
    try {
      const { id } = req.params;
      const { quantidadeItens, familias, nomeAluno, box, periodoAluno, tipo, status, colaborador, assinatura } = req.body;

      await Pedido.update({ quantidadeItens, familias, nomeAluno, periodoAluno, box, tipo, status, colaborador, assinatura }, { where: { id } });

      res.json({ message: 'Pedido atualizado com sucesso.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar pedido.' });
    }
  }

  static async deleteEntity(req, res) {
    try {
      const { id } = req.params;
      await Pedido.destroy({ where: { id } });
      res.json({ message: 'Pedido deletado com sucesso.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao deletar pedido.' });
    }
  }
}

export default PedidoController;
