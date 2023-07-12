const turma = require("../model/turma");
const professor = require("../model/professor");
const aluno = require("../model/aluno");
const materia = require("../model/materia");

module.exports = {
  async HomeAlunoGet(req, res) {
    session = req.session;

    if (!session.edv) {
      res.redirect("/");
      return;
    }

    const Materia = await materia.findAll({
      raw: true,
      where: { IDTurma: session.turma },
    });
    res.render("../views/Home", { session, Materia });
  },

  async HomeProfGet(req, res) {
    session = req.session;

    if (!session.edv) {
      res.redirect("/");
      return;
    }

    const Materia = await materia.findAll({
      raw: true,
      where: {
        IDProfessor: req.session.edv,
      },
    });
    res.render("../views/HomeProf", { Materia, session });
  },
};
