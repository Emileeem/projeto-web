// Importação
const Sequelize = require("sequelize");
const database = require("../config/db");
const materia = require("./materia");

// Criando tabela
const competencias = database.define("Competencias", {
  IDCompetencia: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  Nome: {
    type: Sequelize.STRING(90),
    allowNull: false,
  },
  Peso: {
    type: Sequelize.INTEGER,
  },
});

competencias.belongsTo(materia, {
  constraint: true,
  foreignKey: "IDMateria",
});

module.exports = competencias;
