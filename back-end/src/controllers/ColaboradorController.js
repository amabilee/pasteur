import Colaborador from '../models/Colaborador.js';
import  bcrypt from "bcrypt";


class ColaboradorController {
  static async getAllEntities(req, res) {
    try {
      const colaboradores = await Colaborador.findAll();
      res.json(colaboradores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
  };
  static async getEntity(req, res) {
    try {
      const { id } = req.params;
      const colaborador = await Colaborador.findByPk(id);
      res.json(colaborador);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar usuário.' });
    }
  };
  static async createEntity(req, res) {
    try {
        const colaborador = await Colaborador.create({ matricula,nome,email,senha: bcrypt.hashSync(senha, 10) });
        const { matricula,senha,email,nome,} = req.body;
      res.status(201).json(colaborador);
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
      await Colaborador.update({matricula,nome,email,senha: bcrypt.hashSync(senha, 10) }, { where: { id } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar usuário.' });
    }
  }
  
  static async deleteEntity(req, res) {
    try {
      const { id } = req.params;
      await Colaborador.destroy({ where: { id } });
      res.json({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao deletar usuário.' });
    }
  };
}

export default ColaboradorController;