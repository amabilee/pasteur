import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';

const Pedido = db.define(
  'Pedido',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    matricula: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nomeAluno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    periodoAluno: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantidadeItens: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    familias: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    box: {
      type: DataTypes.STRING,
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
  },
  {
    tableName: 'pedido',
  }
);

export default Pedido;