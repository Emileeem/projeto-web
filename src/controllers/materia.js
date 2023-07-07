const materia = require("../model/materia");
const aluno = require('../model/aluno');
// const turmaMateria = require("../model/turmaMateria");
const turma = require("../model/turma");

module.exports = {
  async materiaGet(req, res) {
    res.render("../views/Materia");
  },

// todo: ligar DB com front, um card para cada materia de cada turma;

  async materiaProfGet(req, res) {
    const Materia = await materia.findByPk(req.params.IDMateria, {
      raw: true
    });
    // const Turma = await turmaMateria.findAll({
    //   raw: true,
    //   where: {IDMateria: req.params.IDMateria} 
    // });

    // console.log(Turma);

    // const Alunos = await aluno.findAll({
    //   raw: true,
    //   where: {IDTurma: Turma.IDTurma}
    // });

    // console.log(Alunos);

    res.render("../views/materiasProf", { Materia });
  },
};
