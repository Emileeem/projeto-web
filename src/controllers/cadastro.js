//importando as tabelas do banco de dados
const turma = require('../model/turma');
const aluno = require('../model/aluno');
const professor = require('../model/professor');

module.exports = {
    async turmaGet(req, res) {
        const DBedv = await professor.findByPk(req.params.IDProfessor, {
            raw: true,
            attributes: ['IDProfessor', 'Nome', 'Senha', 'Foto']
        });
        console.log(req.params.IDProfessor);
        res.render('../views/addTurma', {DBedv});
    },

    async turmaInsert(req, res) {
        //recebendo informações do front-end(ou seja, o que o usuário digitar)
        const dados = req.body;

        //Criando uma nova turma no banco de dados
        await turma.create({
            Nome: dados.Nome
        });

        // Redirecionando para a página principal
        res.redirect(`/homeprof/${req.params.IDProfessor}`)
    },

    async alunoGet(req, res) {
        const turmas = await turma.findAll({
            raw: true //retorna informações da tabela sem metadados.
        });

        const DBedv = await professor.findByPk(req.params.IDProfessor, {
            raw: true
        });
        //passando o nome das salas para o front
        res.render('../views/AddAluno', { turmas, DBedv })
    },

    async alunoInsert(req, res) {
        //Recebendo os dados do aluno pelo Body
        const dados = req.body;

        //nome padrão da foto do aluno
        let foto = 'usuario.png';

        if (req.file) {
            // Pegar novo nome da foto
            foto = req.file.filename;
        }

        await aluno.create({
            IDAluno: dados.EDV,
            Nome: dados.Nome,
            Senha: dados.Senha,
            Foto: foto,
            IDTurma: dados.Turma
        });

        //Redirecionando para a página inicial
        res.redirect(`/homeprof/${req.params.IDProfessor}`);
    },

    async professorGet(req, res) {
        const DBedv = await professor.findByPk(req.params.IDProfessor, {
            raw: true,
            attributes: ['IDProfessor', 'Nome', 'Senha', 'Foto']
        });
        res.render('../views/AddProf', {DBedv});
    },

    async professorInsert(req, res) {
        //recebendo informações
        const dados = req.body;
        let foto = '../img/usuario.png';

        await professor.create({
            IDProfessor: dados.EDV,
            Nome: dados.Nome,
            Senha: dados.Senha,
            Foto: foto
        });

        //Redirecionando para a página inicial
        res.redirect(`/homeprof/${req.params.IDProfessor}`);
    }
}
