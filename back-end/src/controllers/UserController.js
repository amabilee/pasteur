import User from '../models/User.js';
import bcrypt from 'bcrypt';

class UserController {
  static async getAllEntities(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
  }

  static async getEntity(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar usuário.' });
    }
  }

  static async createEntity(req, res) {
    try {
      const { matricula, senha } = req.body;
      if (!senha) {
        return res.status(400).json({ error: 'A senha não pode estar vazia.' });
      }
      const hashedPassword = await bcrypt.hash(senha, 10);
      const createdUser = await User.create({ matricula, senha: hashedPassword });
      res.status(201).json({ user: createdUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
  }

  static async updateEntity(req, res) {
    try {
      const { matricula } = req.params; // Change this line
      const { senha } = req.body;
      if (!senha) {
        return res.status(400).json({ error: 'A senha não pode estar vazia.' });
      }
      const hashedPassword = await bcrypt.hash(senha, 10);
      await User.update({ senha: hashedPassword }, { where: { matricula } }); // Change this line
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