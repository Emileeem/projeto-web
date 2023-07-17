const competencia  = require("../model/competencia");
const situacao = require("../model/situacao");


module.exports = {
    async avaliacaoGet(req, res){
        session = req.session;

        dados = req.dados;

        res.render("../views/AvaliacaoEstudantes", {session})
    },
    async avaliacaoPost (req, res){
        const dados = req.body;
        session = req.session;
        var Competencias = competencia
        var IDCompetencias = [];
        IDCompetencias.push(Competencias.IDCompetencia);
        
        for (let j = 0; j < IDCompetencias.length; j++) {
            const Situacaos = await situacao.create({
              IDCompetencia: IDCompetencias[j],
              Situacao: dados.situ,
        });
        }
    }
}