// Importação
const Sequelize = require('sequelize');
const database = require('../config/db');
const materia = require('./materia');
const aluno = require('./aluno');

//Criando tabela
const feedback = database.define('Feedback',{ 
    IDFeedback: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Descricao: {
        type: Sequelize.STRING(150),
        allowNull: true
    }    
});

feedback.belongsTo(materia, {
    constraint: true,
    foreingKey: 'IDMateria'
});

feedback.belongsTo(aluno, {
    constraint: true,
    foreingKey: 'IDAluno'
});

module.exports = feedback;