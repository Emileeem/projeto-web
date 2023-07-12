const turma = require("../model/turma");
const professor = require("../model/professor");
const aluno = require("../model/aluno");
const materia = require("../model/materia");
const arquivos = require("../model/arquivos");

// const turmaMateria = require('../model/turmaMateria');

module.exports = {
  async AddPdfGet(req, res) {
    const Materia = await materia.findByPk(req.params.IDMateria, {
      raw: true,
    });
    console.log(Materia.IDMateria);
    res.render("../views/AddPdf", { Materia });
  },

  async AddPdfPost(req, res) {
    const dados = req.body;
    await arquivos.create({
      Nome: dados.titulo,
      Caminho: dados.caminho,
      IDMateria: req.params.IDMateria,
    });
    res.redirect(`/materiaProf/${req.params.IDMateria}`);
  },

  async addMateriaGet(req, res) {
    session = req.session;

    if (!session.edv) {
      res.redirect("/");
      return;
    }

    const turmas = await turma.findAll({
      raw: true, //retorna informações da tabela sem metadados.
      attributes: ["IDTurma", "Nome"],
    });

    res.render("../views/addMat", { turmas, session });
  },

  async addMateriaPost(req, res) {
    const dados = req.body;
    await materia.create({
      Nome: dados.Nome,
      IDProfessor: req.params.IDProfessor,
      IDTurma: dados.Turma,
    });
    res.redirect(`/homeprof`);
  },
};
