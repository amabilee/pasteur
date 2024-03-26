import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';

const User = db.define(
    'User', 
    {
        matricula:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true, 
        },
        senha:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        NomeUser:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        cargo:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        box:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        periodo:{
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: 'User',
    }
);

export default User;
