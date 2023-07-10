// Importação
const Sequelize = require("sequelize");
const database = require("../config/db");

//Criando tabela
const professor = database.define("Professor", {
  IDProfessor: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  Nome: {
    type: Sequelize.STRING(75),
    allowNull: false,
  },
  Senha: {
    type: Sequelize.STRING(12),
    allowNull: false,
  },
  Foto: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
});

module.exports = professor;
