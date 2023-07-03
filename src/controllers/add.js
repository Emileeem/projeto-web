const turma = require('../model/turma'); 
const professor = require('../model/professor');
const aluno = require('../model/aluno');
const materia = require('./materia');

module.exports = {
    async AddPdfGet(req, res) {
        res.render('../views/AddPdf');
    },

    async addMateriaGet(req, res) {    
        const DBedv = await professor.findByPk(req.params.IDProfessor, {
            raw: true,
            attributes: ['IDProfessor', 'Nome', 'Senha', 'Foto']
        });
        
        const turmas = await turma.findAll({
            raw: true, //retorna informações da tabela sem metadados.
            attributes: ['IDTurma', 'Nome']
        });
        res.render('../views/addMat', {DBedv, turmas});
    },

    async addMateriaPost(req, res){
        const dados = req.body;
        await materia.create({
            Nome: dados.Nome
            
        })
        res.redirect(`/homeprof/${req.params.IDProfessor}`);
    }
}
