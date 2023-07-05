const turma = require('../model/turma'); 
const professor = require('../model/professor');
const aluno = require('../model/aluno');
const turmaMateria = require('../model/turmaMateria');
const materia = require('../model/materia');

module.exports = {
    async HomeAlunoGet(req, res){
        const DBedv = await aluno.findByPk(req.params.IDAluno, {
            raw: true,
            attributes: ['IDAluno', 'Nome', 'Senha', 'Foto']
        });
        res.render('../views/Home', {DBedv});
    },
    
    async HomeProfGet(req, res){
        const DBedv = await professor.findByPk(req.params.IDProfessor, {
            raw: true,
            attributes: ['IDProfessor', 'Nome', 'Senha', 'Foto']
        });
        const Materia = await materia.findAll({
            raw: true,
            where: {
                IDProfessor: DBedv.IDProfessor,
            }
        });
        console.log(Materia);
        res.render('../views/HomeProf', {Materia, DBedv});
    }
}

