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
      const {id} = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar usuário.' });
    }
  }

  static async createEntity(req, res) {
    try {
      const { matricula, senha, NomeUser, email, cargo, box, periodo } = req.body;

      // Verifica se todos os campos obrigatórios estão presentes
      if (!matricula || !senha || !NomeUser || !cargo) {
        return res.status(400).json({ error: 'Matrícula, senha, Nome do Usuário e cargo são obrigatórios.' });
      }

      // Hash da senha antes de salvar no banco de dados
      const hashedPassword = await bcrypt.hash(senha, 10);

      // Cria o usuário no banco de dados
      const createdUser = await User.create({
        matricula,
        senha: hashedPassword,
        NomeUser,
        email,
        cargo,
        box,
        periodo
      });

      res.status(201).json({ user: createdUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
  }

  static async updateEntity(req, res) {
    try {
      const {id} = req.params; // Use id instead of matricula for updating
      const {senha} = req.body;
      if (!senha) {
        return res.status(400).json({ error: 'A senha não pode estar vazia.' });
      }
      const hashedPassword = await bcrypt.hash(senha, 10);
      const updatedUser = await User.update({ senha: hashedPassword }, { where: {id} });
      if (updatedUser[0] === 0) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }
      res.json({ message: 'Usuário atualizado com sucesso.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar usuário.' });
    }
  }

  static async deleteEntity(req, res) {
    try {
      const {id} = req.params; 
      const deletedUserCount = await User.destroy({ where: {id} });
      if (deletedUserCount === 0) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }
      res.json({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao deletar usuário.' });
    }
  }
}

export default UserController;