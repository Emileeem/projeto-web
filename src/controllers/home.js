const turma = require('../model/turma'); 

module.exports = {
    async HomeAlunoGet(req, res){
        res.render('../views/Home');
    },
    
    async HomeProfGet(req, res){
        res.render('../views/HomeProf');
    }
}

