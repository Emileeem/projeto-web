
const aluno = require('../model/aluno');
const professor = require('../model/professor');
const passport = require("passport");

// const arquivos = require('../model/arquivos'); 
// const competencias = require('../model/competencia'); 
// const feedback = require('../model/feedback'); 
// const turma = require('../model/turma'); 
// const turmaMateria = require('../model/turmaMateria'); 


module.exports = {
    async loginGet(req, res) {
        let erro = false;
        res.render('../views/Login', {erro});
    },

    async loginPost(req, res) {
        session = req.session;

        let erro = false;
        const edv = req.body.edv;
        const senha = req.body.senha;
        const cargo = req.body.cargo;
      
        try {
          if (cargo == 'Professor') {
            const DBedv = await professor.findByPk(edv, {
              raw: true,
            });
            if (DBedv.Senha == senha) {
              // res.redirect(`/homeprof/${DBedv.IDProfessor}`);
              session.edv = DBedv.IDProfessor;
              session.nome = DBedv.Nome;
              session.foto = DBedv.Foto;
              console.log(session);
              res.redirect(`/homeprof`);
            }
          } else {
            const DBedv = await aluno.findByPk(edv, {
              raw: true,
            });
            console.log(DBedv);
            if (DBedv.Senha == senha) {
              session.edv = DBedv.IDAluno;
              session.nome = DBedv.Nome;
              session.foto = DBedv.Foto;
              session.turma = DBedv.IDTurma;
              res.redirect(`/home`);
            }
          }
        } catch (error) {
          erro = true;
          res.render('../views/Login', { erro });
        }
      }
}
