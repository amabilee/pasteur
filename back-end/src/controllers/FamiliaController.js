import Familia from '../models/Familia.js';

class FamiliaController {
    static async getAllEntities(req, res) {
        const { page = 1, limit = 10 } = req.query;

        try {
            const offset = (page - 1) * limit;

            const { count, rows: familias } = await Familia.findAndCountAll({
                offset,
                limit: parseInt(limit),
            });

            const totalPages = Math.ceil(count / limit);

            const pagination = {
                currentPage: parseInt(page),
                totalPages,
                totalItems: count,
            };

            res.json({ familias, pagination });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar famílias.' });
        }
    }

    static async getEntity(req, res) {
        try {
            const { id } = req.params;
            const familia = await Familia.findByPk(id);
            res.json(familia);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar família.' });
        }
    }

    static async createEntity(req, res) {
        try {
            const { nome, quantidadeMIN, quantidadeMAX } = req.body;
            const newFamilia = await Familia.create({ nome, quantidadeMIN, quantidadeMAX });
            res.status(201).json(newFamilia);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao criar família.' });
        }
    }

    static async updateEntity(req, res) {
        try {
            const { id } = req.params;
            const { nome, quantidadeMIN, quantidadeMAX } = req.body;
            await Familia.update({ nome, quantidadeMIN, quantidadeMAX }, { where: { id } });
            res.json({ message: 'Família atualizada com sucesso.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao atualizar família.' });
        }
    }

    static async deleteEntity(req, res) {
        try {
            const { id } = req.params;
            await Familia.destroy({ where: { id } });
            res.json({ message: 'Família deletada com sucesso.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao deletar família.' });
        }
    }
}

export default FamiliaController;
