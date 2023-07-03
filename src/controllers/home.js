const turma = require('../model/turma'); 
const professor = require('../model/professor');
const turmaMateria = require('../model/turmaMateria');
const materia = require('../model/materia');

module.exports = {
    async HomeAlunoGet(req, res){
        res.render('../views/Home');
    },
    
    async HomeProfGet(req, res){
        const DBedv = await professor.findByPk(req.params.IDProfessor, {
            raw: true,
            attributes: ['IDProfessor', 'Nome', 'Senha', 'Foto']
        });
        const TMateria = await turmaMateria.findAll({
            raw: true,
            where: {
                IDProfessor: DBedv.IDProfessor,
            },
            include: [{
                model: materia
            }]
        });
        res.render('../views/HomeProf', {TMateria, DBedv});
    }
}

