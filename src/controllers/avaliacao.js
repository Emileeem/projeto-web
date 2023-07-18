const competencias = require("../model/competencia");
const aluno = require("../model/aluno")
const situacao = require("../model/situacao");
const materia =  require("../model/materia")

module.exports = {
    async avaliacaoGet(req, res) {
        session = req.session;

        if (!session.edv) {
            res.redirect("/");
            return;
          }

        const Materia = await materia.findByPk(req.params.IDMateria, {
            raw: true,
        })
        const Aluno = await aluno.findByPk(req.params.IDAluno, {
            raw: true,
        });
        const Competencias = await situacao.findAll({
            raw: true,
            where: { IDAluno: req.params.IDAluno },
            include: [{
                model: competencias,
                where: { IDMateria: req.params.IDMateria }
            }]
        })
        console.log(Aluno.Nome)
        res.render("../views/AvaliacaoEstudantes", { session, Competencias, Aluno, Materia })
    },
    async avaliacaoPost(req, res) {
        const dados = req.body;
        session = req.session;

        if (!session.edv) {
            res.redirect("/");
            return;
          }

        const Competencias = await situacao.findAll({
            raw: true,
            where: { IDAluno: req.params.IDAluno },
            include: [{
                model: competencias,
                where: { IDMateria: req.params.IDMateria }
            }]
        })
        for (let i = 0; i < dados.Situacao.length; i++) {            
            await situacao.update({Situacao: dados.Situacao[i] }, {where: {
                IDCompetencia: Competencias[i].IDCompetencia,
                IDAluno: req.params.IDAluno
            }})
        }
        res.redirect(`/materiaProf/${req.params.IDMateria}`);
    }
}