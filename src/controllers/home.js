const turma = require("../model/turma");
const professor = require("../model/professor");
const aluno = require("../model/aluno");
const turmaMateria = require("../model/turmaMateria");
const materia = require("../model/materia");

module.exports = {
  async HomeAlunoGet(req, res) {
    const DBedv = await aluno.findByPk(req.params.IDAluno, {
      raw: true,
      attributes: ["IDAluno", "Nome", "Senha", "Foto", "IDTurma"],
    });

    const TurmaMateria = await turmaMateria.findAll({
      raw: true,
      attributes: ["IDTurmaMateria", "IDTurma", "IDMateria"],
      include: [
        {
          model: materia,
          attributes: ["Nome"],
          include: [{
            model: professor,
            attributes: ["Nome", "IDProfessor"]
          }]
        }
      ],
      where: { IDTurma: DBedv.IDTurma },
    });

    res.render("../views/Home", { DBedv, TurmaMateria });
  },

  async HomeProfGet(req, res) {
    const DBedv = await professor.findByPk(req.params.IDProfessor, {
      raw: true,
      attributes: ["IDProfessor", "Nome", "Senha", "Foto"],
    });
    const Materia = await materia.findAll({
      raw: true,
      where: {
        IDProfessor: DBedv.IDProfessor,
      },
    });
    res.render("../views/HomeProf", { Materia, DBedv });
  },
};
