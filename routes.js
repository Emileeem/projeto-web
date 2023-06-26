// Iniciando Route do Express
const express = require('express');
const route = express.Router();
// Importando os Controllers
const home = require('./src/controllers/home');
const login = require('./src/controllers/login');
const add = require('./src/controllers/add');
const materia = require('./src/controllers/materia');
// Iniciando as rotas
route.get('/', login.loginGet);

route.get('/home', home.HomeAlunoGet);

route.get('/homeprof', home.HomeProfGet);

route.get('/addAluno', add.AddAlunoGet);

route.get('/addPdf', add.AddPdfGet);

route.get('/materia', materia.materiaGet);

module.exports = route;