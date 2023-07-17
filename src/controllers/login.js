const aluno = require("../model/aluno");
const professor = require("../model/professor");
const passport = require("passport");

module.exports = {
  async loginGet(req, res) {
    let erro = false;
    res.render("../views/Login", { erro });
  },

  async loginPost(req, res) {
    session = req.session;

    let erro = false;
    const edv = req.body.edv;
    const senha = req.body.senha;
    const cargo = req.body.cargo;

    try {
      if (cargo == "Professor") {
        const Aluno = await professor.findByPk(edv, {
          raw: true,
        });
        if (Aluno.Senha == senha) {
          // res.redirect(`/homeprof/${DBedv.IDProfessor}`);
          session.edv = Aluno.IDProfessor;
          session.nome = Aluno.Nome;
          session.foto = Aluno.Foto;
          res.redirect(`/homeprof`);
        } else {
          erro = true;
          res.render("../views/Login", { erro });
        }
      } else {
        const Aluno = await aluno.findByPk(edv, {
          raw: true,
        });
        if (Aluno.Senha == senha) {
          session.edv = Aluno.IDAluno;
          session.nome = Aluno.Nome;
          session.foto = Aluno.Foto;
          session.turma = Aluno.IDTurma;
          res.redirect(`/home`);
        } else {
          erro = true;
          res.render("../views/Login", { erro });
        }
      }
    } catch (error) {
      erro = true;
      res.render("../views/Login", { erro });
    }
  },
  async logout(req, res) {
    await req.session.destroy();
    res.redirect("/");
  },
};
