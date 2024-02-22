import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';

const pedido = db.define(
    'pedido', 
    {
        matricula: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true, 
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, 
    {
        tableName: 'pedido',  
    }   
);

export default pedido;
