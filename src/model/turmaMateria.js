// Importação
const Sequelize = require('sequelize');
const database = require('../config/db');
const turma = require('./turma');
const materia = require('./materia');
const professor = require('./professor');

// Criando tabela
const turmaMateria = database.define('TurmaMateria', {
  IDTurmaMateria: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

turmaMateria.belongsTo(turma, {
  constraint: true,
  foreignKey: 'IDTurma' // Corrigido: foreignKey, não foreingKey
});

turmaMateria.belongsTo(materia, {
  constraint: true,
  foreignKey: 'IDMateria' // Corrigido: foreignKey, não foreingKey
});

module.exports = turmaMateria;
