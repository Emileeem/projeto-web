// Importação
const Sequelize = require("sequelize");
const database = require("../config/db");
const competencias = require("./competencia");
const aluno = require("./aluno");

// Criando tabela
const situacao = database.define("Situacao", {
  IDSituacao: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  Situacao: {
    type: Sequelize.STRING(90),
    allowNull: false,
  },
});

situacao.belongsTo(competencias, {
  constraint: true,
  foreignKey: "IDCompetencia",
});

situacao.belongsTo(aluno, {
  constraint: true,
  foreignKey: "IDAluno",
});

module.exports = situacao;
