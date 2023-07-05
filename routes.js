// Iniciando Route do Express
const express = require('express');
const route = express.Router();
// Importando os Controllers
const home = require('./src/controllers/home');
const login = require('./src/controllers/login');
const add = require('./src/controllers/add');
const materia = require('./src/controllers/materia');
const cadastro = require('./src/controllers/cadastro')
// Iniciando as rotas
route.get('/', login.loginGet).post('/', login.loginPost);

route.get('/home/:IDAluno', home.HomeAlunoGet);

route.get('/homeprof/:IDProfessor', home.HomeProfGet);

route.get('/addPdf', add.AddPdfGet);

route.get('/materia', materia.materiaGet);

route.get('/materiaProf', materia.materiaProfGet);

route.get('/addAluno/:IDProfessor', cadastro.alunoGet).post('/addAluno/:IDProfessor', cadastro.alunoInsert);

route.get('/addTurma/:IDProfessor', cadastro.turmaGet).post('/addTurma/:IDProfessor', cadastro.turmaInsert);

route.get('/addProf/:IDProfessor', cadastro.professorGet).post('/addProf/:IDProfessor', cadastro.professorInsert);

route.get('/addMateria/:IDProfessor', add.addMateriaGet).post('/addMateria/:IDProfessor', add.addMateriaPost)

module.exports = route;