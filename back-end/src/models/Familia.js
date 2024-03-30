import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';

const Familia = db.define(
    'Familia', 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantidadeMAX: {
            type: DataTypes.INTEGER, // Alterado para INTEGER, ajuste conforme necessário
            allowNull: false,
        },
        quantidadeMIN: {
            type: DataTypes.INTEGER, // Alterado para INTEGER, ajuste conforme necessário
            allowNull: false,
        },
    }
);

export default Familia;