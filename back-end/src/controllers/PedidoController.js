import { Op } from 'sequelize';
import Pedido from '../models/Pedido.js';

class PedidoController {
  static async getAllEntities(req, res) {
    const { page = 1, limit = 7, status, matricula, nomeAluno, periodoAluno, quantidadeItens, familias, box, tipo, colaborador, assinatura } = req.query;

    try {
      const offset = (page - 1) * limit;
      const whereClause = {};

      if (status) {
        whereClause.status = { [Op.like]: `%${status}%` };
      }

      if (matricula) {
        whereClause.matricula = { [Op.like]: `%${matricula}%` };
      }

      if (nomeAluno) {
        whereClause.nomeAluno = { [Op.like]: `%${nomeAluno}%` };
      }

      if (periodoAluno) {
        whereClause.periodoAluno = { [Op.like]: `%${periodoAluno}%` };
      }

      if (quantidadeItens) {
        whereClause.quantidadeItens = { [Op.like]: `%${quantidadeItens}%` };
      }

      if (familias) {
        whereClause.familias = { [Op.like]: `%${familias}%` };
      }

      if (box) {
        whereClause.box = { [Op.like]: `%${box}%` };
      }

      if (tipo) {
        whereClause.tipo = { [Op.like]: `%${tipo}%` };
      }

      if (colaborador) {
        whereClause.colaborador = { [Op.like]: `%${colaborador}%` };
      }

      if (assinatura) {
        whereClause.assinatura = { [Op.like]: `%${assinatura}%` };
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
