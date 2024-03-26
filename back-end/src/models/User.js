import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';

const User = db.define(
    'User', 
    {
<<<<<<< Updated upstream
        matricula:{
            type: DataTypes.STRING,
=======
        id:{
            type: DataTypes.INTEGER,
>>>>>>> Stashed changes
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
<<<<<<< Updated upstream
        senha:{
            type: DataTypes.STRING,
            allowNull: false,
        },
=======
        matricula:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        senha:{
            type: DataTypes.STRING,
            allowNull: false,
        },
>>>>>>> Stashed changes
        NomeUser:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        cargo:{
<<<<<<< Updated upstream
            type: DataTypes.STRING,
=======
            type: DataTypes.INTEGER,
>>>>>>> Stashed changes
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
