// Importação
const Sequelize = require("sequelize");
const database = require("../config/db");
const feedback = require("./feedback");

// Criando tabela
const competencias = database.define("Competencias", {
  IDCompetencia: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  Situacao: {
    type: Sequelize.STRING(20),
  },
  Nome: {
    type: Sequelize.STRING(90),
    allowNull: false,
  },
  Peso: {
    type: Sequelize.INTEGER,
  },
});

competencias.belongsTo(feedback, {
  constraint: true,
  foreignKey: "IDFeedback",
});

module.exports = competencias;
