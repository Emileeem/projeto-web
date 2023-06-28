// Importação
const Sequelize = require('sequelize');
const database = require('../config/db');
const turma = require('./turma');

//Criando tabela
const aluno = database.define('Aluno', {
    IDAluno: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    Nome: {
        type: Sequelize.STRING(75),
        allowNull: false
    },
    Senha: {
        type: Sequelize.STRING(12),
        allowNull: false
    },
    Foto: {
        type: Sequelize.STRING(255),
        allowNull: false
    }
});

aluno.belongsTo(turma, {
    constraint: true,
    foreignKey: 'IDTurma'
});

module.exports = aluno;