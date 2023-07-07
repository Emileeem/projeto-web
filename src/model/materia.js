// Importação
const Sequelize = require("sequelize");
const database = require("../config/db");
const turma = require("./turma");
const professor = require("./professor");

// Criando tabela
const materia = database.define("Materia", {
  IDMateria: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  Nome: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
});

materia.belongsTo(turma, {
  constraint: true,
  foreignKey: "IDTurma", // Corrigido: foreignKey, não foreingKey
});

materia.belongsTo(professor, {
  constraint: true,
  foreignKey: "IDProfessor", // Corrigido: foreignKey, não foreingKey
});

module.exports = materia;
