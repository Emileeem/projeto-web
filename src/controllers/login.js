
const aluno = require('../model/aluno');
const professor = require('../model/professor');
const turmaMateria = require('../model/turmaMateria');
const materia = require('../model/materia'); 

// const arquivos = require('../model/arquivos'); 
// const competencias = require('../model/competencia'); 
// const feedback = require('../model/feedback'); 
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
            if (DBedv.Senha == senha) {

                // const teste = turmaMateria.findAll({
                //     raw: true,
                //     attributes: [],
                //     include: [{
                //         model: professor,
                //         required: true,
                //         attributes: []
                //     }],
                //     where: [professor.edv = edv]
                // });

                const TMateria = await turmaMateria.findAll({
                    raw: true,
                    where: {
                        IDProfessor: edv,
                    },
                    include: [{
                        model: materia 
                    }] 
                });
                console.log(TMateria)
                res.render('../views/HomeProf', {DBedv});
            }
        }
    }
}
