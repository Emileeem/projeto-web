// Importação
const Sequelize = require('sequelize');
const database = require('../config/db');
const turmaMateria = require('./turmaMateria');

//Criando tabela
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
    }
});

arquivos.belongsTo(turmaMateria, {
    constraint: true,
    foreignKey: 'IDTurmaMateria'
});

module.exports = arquivos;