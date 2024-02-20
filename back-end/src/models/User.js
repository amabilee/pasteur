import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';

const User = db.define(
    'User', 
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
        tableName: 'User',  
    }   
);

export default User;
