// Importação
const Sequelize = require("sequelize");
const database = require("../config/db");
const turma = require("./turma");

// Criando tabela
const calendario = database.define("Calendario", {
  IDCalendario: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  DataInicio: {
    allowNull: false,
    type: Sequelize.DATEONLY,
  },
  DataFim: {
    allowNull: false,
    type: Sequelize.DATEONLY,
  },
  Titulo: {
    allowNull: false,
    type: Sequelize.STRING(90),
  },
});

calendario.belongsTo(turma, {
  constraint: true,
  foreignKey: "IDTurma",
});

module.exports = calendario;
