const materia = require("../model/materia");
const aluno = require("../model/aluno");
const feedback = require("../model/feedback");
const competencias = require("../model/competencia");
const arquivos = require("../model/arquivos");

module.exports = {
  async materiaGet(req, res) {
    const Materia = await materia.findByPk(req.params.IDMateria, {
      raw: true,
    });
    const Aluno = await aluno.findByPk(req.params.IDAluno, {
      raw: true,
    });
    const Competencias = await competencias.findAll({
      raw: true,
      include: [
        {
          model: feedback,
          where: {
            IDMateria: req.params.IDMateria,
            IDAluno: req.params.IDAluno,
          },
        },
      ],
    });
    const Arquivos = await arquivos.findAll({
      raw: true,
      where: { IDMateria: req.params.IDMateria },
    });
    console.log(Competencias);
    res.render("../views/Materia", { Materia, Competencias, Arquivos, Aluno });
  },

  async materiaProfGet(req, res) {
    const Materia = await materia.findByPk(req.params.IDMateria, {
      raw: true,
    });
    const Alunos = await aluno.findAll({
      raw: true,
      where: { IDTurma: Materia.IDTurma },
    });

    res.render("../views/materiasProf", { Materia, Alunos });
  },
};
