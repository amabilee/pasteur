import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';

const User = db.define(
    'admin', 
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
            tableName: 'admin',  
        }   
);

export default User;
