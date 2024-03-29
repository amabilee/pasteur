import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';

const Pedido = db.define(
  'Pedido',
  {
    matricula: {
      type: DataTypes.INTEGER,
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
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Pendente', 'Aprovado', 'Reprovado'),
      allowNull: false,
      defaultValue: 'Pendente',
    },
    colaborador: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assinatura: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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

export default Pedido;
