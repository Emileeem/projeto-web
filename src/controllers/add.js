module.exports = {
    async AddAlunoGet(req, res){
        res.render('../views/AddPessoa');
    },
    
    async AddPdfGet(req, res){
        res.render('../views/AddPdf');
    }
}
