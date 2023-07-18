const turma = require("../model/turma");
const aluno = require("../model/aluno");
const arquivo = require("../model/arquivos");
const materia = require("../model/materia");
const feedback = require("../model/feedback");
const competencia = require("../model/competencia");
const situacao = require("../model/situacao");

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
    res.render("../views/AddPdf", { Materia });
  },

  async AddPdfPost(req, res) {
    session = req.session;

    if (!session.edv) {
      res.redirect("/");
      return;
    }

    // Pegar novo nome da foto
    let caminho = req.file.filename;

    const dados = req.body;
    await arquivo.create({
      Nome: dados.titulo,
      Caminho: caminho,
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

    const Turmas = await turma.findAll({
      raw: true, //retorna informações da tabela sem metadados.
      attributes: ["IDTurma", "Nome"],
    });

    res.render("../views/addMat", { Turmas, session });
  },

  async addMateriaPost(req, res) {
    const dados = req.body;
    session = req.session;
    var IDCompetencias = [];

    const Materias = await materia.create({
      Nome: dados.NomeMateria,
      IDProfessor: session.edv,
      IDTurma: dados.Turma,
    });

    const Alunos = await aluno.findAll({
      raw: true,
      where: { IDTurma: dados.Turma },
    });

    if (Array.isArray(dados.Nome)) {
      for (let i = 0; i < dados.Nome.length; i++) {
        const Competencias = await competencia.create({
          Nome: dados.Nome[i],
          Peso: dados.Peso[i],
          IDMateria: Materias.IDMateria,
        });
        IDCompetencias.push(Competencias.IDCompetencia);
      }
    } else {
      const Competencias = await competencia.create({
        Nome: dados.Nome,
        Peso: dados.Peso,
        IDMateria: Materias.IDMateria,
      });
      IDCompetencias.push(Competencias.IDCompetencia);
    }
    for (let i = 0; i < Alunos.length; i++) {
      for (let j = 0; j < IDCompetencias.length; j++) {
        await situacao.create({
          IDCompetencia: IDCompetencias[j],
          Situacao: "Inapto",
          IDAluno: Alunos[i].IDAluno,
        });
      }

      await feedback.create({
        IDMateria: Materias.IDMateria,
        IDAluno: Alunos[i].IDAluno,
      });
    }
    res.redirect(`/homeprof`);
  },
};
