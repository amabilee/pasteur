import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';

const Familia = db.define(
    'Familia', 
    {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantidadeBase: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantidadeMAX: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantidadeMIN: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, 
    {
        tableName: 'Familia',  
    }   
);

export default Familia;
