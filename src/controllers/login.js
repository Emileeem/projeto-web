
const aluno = require('../model/aluno');
const professor = require('../model/professor');

// const arquivos = require('../model/arquivos'); 
// const competencias = require('../model/competencia'); 
// const feedback = require('../model/feedback'); 
// const materia = require('../model/materia'); 
// const turma = require('../model/turma'); 
// const turmaMateria = require('../model/turmaMateria'); 


module.exports = {
    async loginGet(req, res) {
        res.render('../views/Login');
    },

    async loginPost(req, res) {
        const edv = req.body.edv;
        const senha = req.body.senha
        console.log(edv);
        const cargo = req.body.cargo;
        if (cargo == 'Professor') {
            const DBedv = await professor.findByPk(edv, {
                raw: true,
                attributes: ['IDProfessor', 'Nome', 'Senha', 'Foto']
            });
            console.log(DBedv);
            if (DBedv.Senha == senha) {
                res.render('../views/HomeProf');
            }
        }
    }
}
