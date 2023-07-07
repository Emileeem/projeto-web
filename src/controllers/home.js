const turma = require("../model/turma");
const professor = require("../model/professor");
const aluno = require("../model/aluno");
const materia = require("../model/materia");

module.exports = {
  async HomeAlunoGet(req, res) {
    const DBedv = await aluno.findByPk(req.params.IDAluno, {
      raw: true
    });

    const Materia = await materia.findAll({
      raw: true,
      where: { IDTurma: DBedv.IDTurma },
    });

    res.render("../views/Home", { DBedv, Materia });
  },

  async HomeProfGet(req, res) {
    const DBedv = await professor.findByPk(req.params.IDProfessor, {
      raw: true
    });
    const Materia = await materia.findAll({
      raw: true,
      where: {
        IDProfessor: DBedv.IDProfessor,
      },
    });
    console.log(Materia);
    res.render("../views/HomeProf", { Materia, DBedv });
  },
};
