// Importação
const Sequelize = require('sequelize');
const database = require('../config/db');
const turma = require('./turma');
const materia = require('./materia');

//Criando tabela

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
    foreingKey: 'IDTurma'
});

turmaMateria.belongsTo(materia, {
    constraint: true,
    foreingKey: 'IDMateria'
});

module.exports = turmaMateria;