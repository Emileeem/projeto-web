//importando as tabelas do banco de dados
const turma = require("../model/turma");
const aluno = require("../model/aluno");
const professor = require("../model/professor");

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

    if (!session.edv) {
      res.redirect("/");
      return;
    }

    const turmas = await turma.findAll({
      raw: true, //retorna informações da tabela sem metadados.
    });

    //passando o nome das salas para o front
    res.render("../views/AddAluno", { turmas, session });
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

    await aluno.create({
      IDAluno: dados.EDV,
      Nome: dados.Nome,
      Senha: dados.Senha,
      Foto: foto,
      IDTurma: dados.Turma,
    });

    //Redirecionando para a página inicial
    res.redirect(`/homeprof`);
  },

  async professorGet(req, res) {
    session = req.session;

    if (!session.edv) {
      res.redirect("/");
      return;
    }

    res.render("../views/AddProf", { session });
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

    console.log(req.body);

    await professor.create({
      IDProfessor: dados.EDV,
      Nome: dados.Nome,
      Senha: dados.Senha,
      Foto: foto,
    });

    //Redirecionando para a página inicial
    res.redirect(`/homeprof`);
  },
};
