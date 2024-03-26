//familiaController.js
import Familia from '../models/Familia.js';
import  bcrypt from "bcrypt";


class FamiliaController {
  static async getAllEntities(req, res) {
    try {
      const Familiaes = await Familia.findAll();
      res.json(Familiaes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
  };
  static async getEntity(req, res) {
    try {
      const { id } = req.params;
      const Familia = await Familia.findByPk(id);
      res.json(Familia);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar usuário.' });
    }
  };
static async createEntity(req, res) {
    try {
            const { nome, quantidadeMIN, quantidadeBase, quantidadeMax } = req.body;
            const Familia = await Familia.create({ nome, quantidadeBase, quantidadeMax, quantidadeMIN });
            res.status(201).json(Familia);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
};

static async updateEntity(req, res) {
    try {
        const { nome } = req.body;
        await Familia.update({ nome }, { where: { id } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar usuário.' });
    }
}
  
  static async deleteEntity(req, res) {
    try {
      const { id } = req.params;
      await Familia.destroy({ where: { id } });
      res.json({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao deletar usuário.' });
    }
  };
}

export default FamiliaController;