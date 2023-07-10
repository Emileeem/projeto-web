// Iniciando Route do Express
const express = require('express');
const route = express.Router();
// Importando os Controllers
const home = require('./src/controllers/home');
const login = require('./src/controllers/login');
const add = require('./src/controllers/add');
const materia = require('./src/controllers/materia');
const cadastro = require('./src/controllers/cadastro');
const calendar = require('./src/controllers/calendario');

// Iniciando as rotas
route.get('/', login.loginGet).post('/', login.loginPost);

route.get('/home/:IDAluno', home.HomeAlunoGet);

route.get('/homeprof/:IDProfessor', home.HomeProfGet);

route.get('/addPdf/:IDMateria', add.AddPdfGet).post('/addPdf/:IDMateria', add.AddPdfPost);

route.get('/:IDAluno/materia/:IDMateria', materia.materiaGet);

route.get('/materiaProf/:IDMateria', materia.materiaProfGet);

route.get('/addAluno/:IDProfessor', cadastro.alunoGet).post('/addAluno/:IDProfessor', cadastro.alunoInsert);

route.get('/addTurma/:IDProfessor', cadastro.turmaGet).post('/addTurma/:IDProfessor', cadastro.turmaInsert);

route.get('/addProf/:IDProfessor', cadastro.professorGet).post('/addProf/:IDProfessor', cadastro.professorInsert);

route.get('/addMateria/:IDProfessor', add.addMateriaGet).post('/addMateria/:IDProfessor', add.addMateriaPost);

route.get('/calendarioProf/:IDTurma', calendar.calendarGet).post('/calendarioProf/:IDTurma', calendar.calendarInsert);

route.get('/evento', calendar.eventosGet)


module.exports = route;