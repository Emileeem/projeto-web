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

    function imagem_aleatoria() {
      var images = [
        "/img/verdemedio.png",
        "/img/verdeescuro.png",
        "/img/azul.png",
        "/img/azulmedio.png",
        "/img/vermelho.png",
        "/img/marrom.png",
        "/img/azulfofo.png",
        "/img/verde.jpg",
        "/img/rosa.png",
        "/img/vinho.png",
        "/img/roxo.png"      
      ];
      let img = images[Math.floor(Math.random() * ((images.length - 1) - 0 + 1)) + 0];

      console.log(img);
      return img;
  }
    
    const Materia = await materia.findAll({
      raw: true,
      where: {
        IDProfessor: req.session.edv,
      },
    });
    res.render("../views/HomeProf", { Materia, session, imagem_aleatoria });
  },
};
