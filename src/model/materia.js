// Importação
const Sequelize = require('sequelize');
const database = require('../config/db');
const professor = require('./professor');

//Criando tabela
const materia = database.define('Materia', {
    IDMateria: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    Nome: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
});

module.exports = materia;