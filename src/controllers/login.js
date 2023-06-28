const aluno = require('../model/aluno'); 
const professor = require('../model/professor'); 

// const arquivos = require('../model/arquivos'); 
// const competencias = require('../model/competencia'); 
// const feedback = require('../model/feedback'); 
// const materia = require('../model/materia'); 
// const turma = require('../model/turma'); 
// const turmaMateria = require('../model/turmaMateria'); 


module.exports = {
    async loginGet(req, res){
        res.render('../views/Login');
    }
}
