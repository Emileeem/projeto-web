// Importação
const Sequelize = require('sequelize');
const database = require('../config/db');
const materia = require('./materia');

// Criando tabela
const arquivos = database.define('Arquivos', {
  IDArquivos: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  Nome: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  Caminho: {
    type: Sequelize.STRING(255),
    allowNull: false
  }
});

arquivos.belongsTo(materia, {
  constraint: true,
  foreignKey: 'IDMateria'
});

module.exports = arquivos;
