import Admin from '../models/Admin.js';
import  bcrypt from "bcrypt";


class AdminController {
  static async getAllEntities(req, res) {
    try {
      const Admins = await Admin.findAll();
      res.json(Admins);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar usuários.' });
      res.json(Admins);
    }
  };
  static async getEntity(req, res) {
    try {
      const { id } = req.params;
      const Admin = await Admin.findByPk(id);
      res.json(Admin);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar usuário.' });
    }
  };
  static async createEntity(req, res) {
    try {
        const Admin = await Admin.create({ matricula,nome,email,senha: bcrypt.hashSync(senha, 10) });
        const { matricula,senha,email,nome,} = req.body;
      res.status(201).json(Admin);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
  };

  static async updateEntity(req, res) {
    try {
      const { id } = req.params;
      const { matricula,senha,email,nome } = req.body;
      res.json({ message: 'Usuário atualizado com sucesso.' });
      await Admin.update({matricula,nome,email,senha: bcrypt.hashSync(senha, 10) }, { where: { id } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar usuário.' });
    }
  }
  
  static async deleteEntity(req, res) {
    try {
      const { id } = req.params;
      await Admin.destroy({ where: { id } });
      res.json({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao deletar usuário.' });
    }
  };
}

export default AdminController;