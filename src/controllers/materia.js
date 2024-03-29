const materia = require("../model/materia");
const aluno = require("../model/aluno");
const arquivos = require("../model/arquivos");
const competencia = require("../model/competencia");
const situacao = require("../model/situacao");
const feedback = require("../model/feedback");

module.exports = {
  async materiaGet(req, res) {
    session = req.session;

    if (!session.edv) {
      res.redirect("/");
      return;
    }

    const Feedbacks = await feedback.findOne({
      raw: true,
      where: { IDMateria: req.params.IDMateria, IDAluno: session.edv },
    });

    const Materia = await materia.findByPk(req.params.IDMateria, {
      raw: true,
    });

    const Arquivos = await arquivos.findAll({
      raw: true,
      where: { IDMateria: req.params.IDMateria },
    });

    const Competencias = await situacao.findAll({
      raw: true,
      include: [
        {
          model: competencia,
          where: { IDMateria: req.params.IDMateria },
        },
      ],
      where: { IDAluno: session.edv },
    });

    let total = 0;
    let desempenho = 0;

    for (let i = 0; i < Competencias.length; i++) {
      switch (Competencias[i].Situacao) {
        case "Inapto":
          break;
        case "Em Desenvolvimento":
          desempenho += Competencias[i]["Competencia.Peso"] / 2;
          break;
        case "Apto":
          desempenho += Competencias[i]["Competencia.Peso"];
          break;
      }
      total += Competencias[i]["Competencia.Peso"];
    }
    let aptidao = (desempenho / total) * 100;

    res.render("../views/Materia", {
      Materia,
      Arquivos,
      session,
      Competencias,
      aptidao,
      Feedbacks,
    });
  },

  async materiaProfGet(req, res) {
    session = req.session;
    if (!session.edv) {
      res.redirect("/");
      return;
    }

    const Materia = await materia.findByPk(req.params.IDMateria, {
      raw: true,
    });

    const Situacao = await situacao.findAll({
      raw: true,
      include: [
        {
          model: competencia,
          where: { IDMateria: Materia.IDMateria },
        },
      ],
    });

    const Alunos = await aluno.findAll({
      raw: true,
      where: { IDTurma: Materia.IDTurma },
    });

    let total = 0;
    let desempenho = 0;

    for (let i = 0; i < Situacao.length; i++) {
      switch (Situacao[i].Situacao) {
        case "Inapto":
          break;
        case "Em Desenvolvimento":
          desempenho += Situacao[i]["Competencia.Peso"] / 2;
          break;
        case "Apto":
          desempenho += Situacao[i]["Competencia.Peso"];
          break;
      }
      total += Situacao[i]["Competencia.Peso"];
    }

    const Arquivos = await arquivos.findAll({
      raw: true,
      where: { IDMateria: req.params.IDMateria },
    });

    let aptidao = (desempenho / total) * 100;

    res.render("../views/materiasProf", { Materia, Alunos, aptidao, Arquivos });
  },
};
