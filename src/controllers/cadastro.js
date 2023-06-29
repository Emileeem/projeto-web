//importando as tabelas do banco de dados
const turma = require('../model/turma');
const aluno = require('../model/aluno');
const prof = require('../model/professor');

module.exports = {
    async turmaGet(req, res) {
        res.render('../views/addTurma');
    },

    async turmaInsert(req, res) {

        //recebendo informações do front-end(ou seja, o que o usuário digitar)
        const dados = req.body;

        //Criando uma nova turma no banco de dados
        await turma.create({
            Nome: dados.Nome
        });

        // Redirecionando para a página principal
        res.render('../views/HomeProf')
    },

    async alunoGet(req, res) {

        //Encontrando as salas disponíveis no sql para a FK da tabela
        const turmas = await turma.findAll({
            raw: true, //retorna informações da tabela sem metadados.
            attributes: ['IDTurma', 'Nome']
        });

        //passando o nome das salas para o front
        res.render('../views/AddAluno', { turmas })
    },

    async alunoInsert(req, res) {

        //Recebendo os dados do aluno pelo Body
        const dados = req.body;

        //nome padrão da foto do aluno
        let foto = '../img/usuario.png';

        await aluno.create({
            IDAluno: dados.EDV,
            Nome: dados.Nome,
            Senha: dados.Senha,
            Foto: foto
        });

        //Redirecionando para a página inicial
        res.render('../views/HomeProf')
    },

    async professorGet(req, res) {
        res.render('../views/AddProf');
    },

    async professorInsert(req, res) {
        //recebendo informações
        const dados = req.body;
        console.log(dados)
        let foto = '../img/usuario.png';

        await prof.create({
            IDProfessor: dados.EDV,
            Nome: dados.name,
            Senha: dados.senha,
            Foto: foto
        });

        //Redirecionando para a página inicial
        res.render('../views/HomeProf')
    }
}
