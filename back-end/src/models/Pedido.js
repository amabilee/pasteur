import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';
import User from './User.js';

const pedido = db.define(
  'pedido',
  {
    matricula: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    quantidadeItens: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    box: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        async isValidBox(value) {
          const user = await User.findOne({ where: { box: value } });
          if (!user) {
            throw new Error('O valor de "box" não é válido.');
          }
        }
      }
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    colaborador: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assinatura: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        async isValidSignature(value) {
          if (value !== true) {
          }
        }
      }
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    hora: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'pedido',
  }
);

User.hasMany(pedido, { foreignKey: 'matricula' });
pedido.belongsTo(User, { foreignKey: 'matricula' });

export default pedido;
