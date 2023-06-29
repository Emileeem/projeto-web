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

route.get('/home', home.HomeAlunoGet);

route.get('/homeprof', home.HomeProfGet);

route.get('/addPdf', add.AddPdfGet);

route.get('/materia', materia.materiaGet);

route.get('/addAluno', cadastro.alunoGet).post('/addAluno', cadastro.alunoInsert);

route.get('/addTurma', cadastro.turmaGet).post('/addTurma', cadastro.turmaInsert);

route.get('/addProf', cadastro.professorGet).post('/addProf', cadastro.professorInsert);

module.exports = route;