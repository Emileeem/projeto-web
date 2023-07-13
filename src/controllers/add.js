const turma = require("../model/turma");
const professor = require("../model/professor");
const aluno = require("../model/aluno");
const materia = require("../model/materia");
const arquivos = require("../model/arquivos");
const competencias = require("../model/competencia");

// const turmaMateria = require('../model/turmaMateria');

module.exports = {
  async AddPdfGet(req, res) {
    session = req.session;

    if (!session.edv) {
      res.redirect("/");
      return;
    }

    const Materia = await materia.findByPk(req.params.IDMateria, {
      raw: true,
    });
    console.log(Materia.IDMateria);
    res.render("../views/AddPdf", { Materia });
  },

  async AddPdfPost(req, res) {
    session = req.session;

    if (!session.edv) {
      res.redirect("/");
      return;
    }

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
    session = req.session;

    if (!session.edv) {
      res.redirect("/");
      return;
    }

    const dados = req.body;
    // const Materia = await materia.create({
    //   Nome: dados.NomeMateria,
    //   IDProfessor: req.params.IDProfessor,
    //   IDTurma: dados.Turma,
    // });

    // // const Alunos = await aluno.findAll({
    // //   raw: true,
    // //   where: {IDTurma: dados.Turma}
    // // });

    // // for(i= 0; i<Alunos.IDAluno.length; i++){
    // //   const Feedback = await Feedback.create({
    // //     IDMateria: Materia.IDMateria,
    // //     IDAluno: Alunos[i].IDAluno,
    // //   });
    // //   for(i=0; i<dados.Nome.length; i++){
    // //     await competencias.create({
    // //       Nome: dados.Nome[i],
    // //       Peso: dados.Peso[i],
    // //       IDFeedback: Feedback.IDFeedback
    // //     })
    // //   }
    // // }

    res.redirect(`/homeprof/${req.params.IDProfessor}`);
  },
};
