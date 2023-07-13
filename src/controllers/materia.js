const materia = require("../model/materia");
const aluno = require("../model/aluno");
const arquivos = require("../model/arquivos");

module.exports = {
  async materiaGet(req, res) {
    session = req.session;

    if (!session.edv) {
      res.redirect("/");
      return;
    }

    const Materia = await materia.findByPk(req.params.IDMateria, {
      raw: true,
    });
    const Arquivos = await arquivos.findAll({
      raw: true,
      where: { IDMateria: req.params.IDMateria },
    });

    res.render("../views/Materia", { Materia, Arquivos, session });
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
    const Alunos = await aluno.findAll({
      raw: true,
      where: { IDTurma: Materia.IDTurma },
    });
    res.render("../views/materiasProf", { Materia, Alunos });
  },
};
