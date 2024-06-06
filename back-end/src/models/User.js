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
        },
        nomeUser:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        cargo:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isIn: [[0, 1, 2, 3]] // Aceita apenas os valores 1, 2 e 3
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    }
);

// Mapeamento dos valores do campo cargo para os tipos de cargos correspondentes
User.getCargoName = function(cargo) {
    switch (cargo) {
        case 1:
            return 'admin';
        case 2:
            return 'colaborador';
        case 3:
            return 'aluno';
        default:
            return ''; // ou 'cargo inválido'
    }
};

export default User;