import Sequelize from 'sequelize'; // Importa o Sequelize
import User from '../models/User.js';
import bcrypt from 'bcrypt';

class UserController {
  static async getAllEntities(req, res) {
    const { page = 1, limit = 7, cargo, matricula, nomeUser, status } = req.query;

    try {
      const offset = (page - 1) * limit;

      let whereClause = {};

      if (cargo) {
        whereClause.cargo = { [Sequelize.Op.like]: `%${cargo}%` };
      }
      if (matricula) {
        whereClause.matricula = { [Sequelize.Op.like]: `%${matricula}%` };
      }
      if (nomeUser) {
        whereClause.nomeUser = { [Sequelize.Op.like]: `%${nomeUser}%` };
      }
      if (status) {
        whereClause.status = { [Sequelize.Op.like]: `%${status}%` };
      }

      const { count, rows: users } = await User.findAndCountAll({
        where: whereClause,
        offset,
        limit: parseInt(limit),
      });

      const totalPages = Math.ceil(count / limit);

      const pagination = {
        currentPage: parseInt(page),
        totalPages,
        totalItems: count,
      };

      res.json({ users, pagination });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
  }

  static async getEntity(req, res) {
    try {
      const { matricula } = req.params;
      const user = await User.findByPk(matricula);
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar usuário.' });
    }
  }

  static async createEntity(req, res) {
    try {
      const { matricula, senha, nomeUser, cargo, status } = req.body;
      if (!senha) {
        return res.status(400).json({ error: 'A senha não pode estar vazia.' });
      }
      const hashedPassword = await bcrypt.hash(senha, 10);
      const createdUser = await User.create({ matricula, senha: hashedPassword, nomeUser, cargo, status });
      res.status(201).json({ user: createdUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
  }

  static async updateEntity(req, res) {
    try {
      const { matricula } = req.params;
      const { senha, nomeUser, cargo, status } = req.body;
      if (!senha) {
        return res.status(400).json({ error: 'A senha não pode estar vazia.' });
      }
      const hashedPassword = await bcrypt.hash(senha, 10);
      await User.update({ senha: hashedPassword, nomeUser, cargo, status }, { where: { matricula } });
      res.json({ message: 'Usuário atualizado com sucesso.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar usuário.' });
    }
  }

  static async deleteEntity(req, res) {
    try {
      const { matricula } = req.params;
      await User.destroy({ where: { matricula } });
      res.json({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao deletar usuário.' });
    }
  }
}

export default UserController;
