//importando as tabelas do banco de dados
const materia = require("../model/materia");
const turma = require("../model/turma");
const aluno = require("../model/aluno");
const professor = require("../model/professor");
const competencia = require("../model/competencia");
const situacao = require("../model/situacao");
const feedback = require("../model/feedback");

module.exports = {
  async turmaGet(req, res) {
    session = req.session;

    if (!session.edv) {
      res.redirect("/");
      return;
    }

    res.render("../views/addTurma", { session });
  },

  async turmaInsert(req, res) {
    session = req.session;

    if (!session.edv) {
      res.redirect("/");
      return;
    }

    //recebendo informações do front-end(ou seja, o que o usuário digitar)
    const dados = req.body;

    //Criando uma nova turma no banco de dados
    await turma.create({
      Nome: dados.Nome,
    });

    // Redirecionando para a página principal
    res.redirect(`/homeprof`);
  },

  async alunoGet(req, res) {
    session = req.session;
    erro = false;
    erro2 = false;
    if (!session.edv) {
      res.redirect("/");
      return;
    }

    const turmas = await turma.findAll({
      raw: true, //retorna informações da tabela sem metadados.
    });

    //passando o nome das salas para o front
    res.render("../views/AddAluno", { turmas, session, erro, erro2});
  },

  async alunoInsert(req, res) {
    session = req.session;

    if (!session.edv) {
      res.redirect("/");
      return;
    }

    //Recebendo os dados do aluno pelo Body
    const dados = req.body;

    //nome padrão da foto do aluno
    let foto = "usuario.png";

    if (req.file) {
      // Pegar novo nome da foto
      foto = req.file.filename;
    }
    if (dados.EDV.length == 8 && dados.Senha.length >= 6) {
      const Aluno = await aluno.create({
        IDAluno: dados.EDV,
        Nome: dados.Nome,
        Senha: dados.Senha,
        Foto: foto,
        IDTurma: dados.Turma,
      });
      const Materias = await materia.findAll({
        raw: true,
        where: { IDTurma: dados.Turma },
      });
  
      for (let i = 0; i < Materias.length; i++) {
        const Competencias = await competencia.findAll({
          raw: true,
          where: { IDMateria: Materias[i].IDMateria },
        });
        await feedback.create({
          IDMateria: Materias[i].IDMateria,
          IDAluno: Aluno.IDAluno,
        });
        for (let j = 0; j < Competencias.length; j++) {
          await situacao.create({
            Situacao: "Inapto",
            IDAluno: Aluno.IDAluno,
            IDCompetencia: Competencias[j].IDCompetencia,
          });
        }
      }
    }
    if(dados.EDV.length != 8){
      const turmas = await turma.findAll({
        raw: true, //retorna informações da tabela sem metadados.
      });
      erro = true;
      res.render("../views/AddAluno", { erro, session, turmas})
      return
    }
    if(dados.Senha < 6){
      const turmas = await turma.findAll({
        raw: true, //retorna informações da tabela sem metadados.
      });
      erro2 = true;
      res.render("../views/AddAluno", { erro2, session, turmas})
      return
    }
    //Redirecionando para a página inicial
    res.redirect(`/homeprof`);
  },

  async professorGet(req, res) {
    session = req.session;
    erro = false;
    erro2 = false;
    if (!session.edv) {
      res.redirect("/");
      return;
    }

    res.render("../views/AddProf", { session, erro, erro2 });
  },

  async professorInsert(req, res) {
    session = req.session;

    if (!session.edv) {
      res.redirect("/");
      return;
    }

    //recebendo informações
    const dados = req.body;

    let foto = "../img/usuario.png";

    if (req.file) {
      // Pegar novo nome da foto
      foto = req.file.filename;
    }

    if (dados.EDV.length == 8 && dados.Senha.length >= 6) {
      await professor.create({
        IDProfessor: dados.EDV,
        Nome: dados.Nome,
        Senha: dados.Senha,
        Foto: foto,
      });
      //Redirecionando para a página inicial
      res.redirect(`/homeprof`);
    }
    if(dados.EDV.length != 8) {
      erro = true;
      res.render("../views/AddProf", { erro })
      return
    }
    else if(dados.Senha.lenght < 6){
      erro2 = true;
      res.render("../views/AddProf", {erro2})
      return
    }
  },
};
