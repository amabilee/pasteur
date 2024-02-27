import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';

const User = db.define(
    'User', 
    {
        matricula:{
            type: DataTypes.STRING,
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
            type: DataTypes.STRING,
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
    //explemplo json
    //    { {
    // {
    //     "matricula": "12345",
    //     "senha": "senha123",
    //     "nome": "João Silva",
    //     "email": "joao.silva@example.com",
    //     "cargo": "Analista de Dados",
    //     "box": "A12"
    //     "periodo": ""
    //   }
      
);

export default User;
