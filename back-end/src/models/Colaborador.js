import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';

const User = db.define(
    'Colaborador', 
    {
        matricula: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },  
    {
            tableName: 'Colaborador',  
        }   
);

export default User;
