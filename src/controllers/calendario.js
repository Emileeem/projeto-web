//importando as tabelas
const calendar = require('../model/calendario');
const turma = require('../model/turma');
const professor = require('../model/professor')
module.exports = {
    async eventosGet(req,res) {
        const Eventos= await calendar.findAll({
            raw:true,   
        });
        res.json(Eventos)
    },
    
    async calendarGet(req, res) {
        const turmas = await turma.findAll({
            raw: true //retorna informações da tabela sem metadados.
        });

        const DBedv = await professor.findByPk(req.params.IDProfessor, {
            raw: true,
        });

        res.render('../views/calendarioProf', { turmas, DBedv });
    },

    async calendarInsert(req, res) {
        //dados enviados do site 
        const dados = req.body;
        console.log(req.body.turma)
        await calendar.create({
            DataInicio: dados.DataIni,
            DataFim: dados.DataFim,
            Titulo: dados.Titulo,
            IDTurma: dados.turma,
        })

        //redirecionando para o calendário
        res.redirect(`/calendarioProf/${req.params.IDProfessor}`)
    }
}