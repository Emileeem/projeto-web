// Iniciando o multer
const multer = require("multer");
// Arquivo do multer importado
const config = require("./src/config/multer");
// Iniciando Route do Express
const express = require("express");
const route = express.Router();
// Importando os Controllers
const home = require("./src/controllers/home");
const login = require("./src/controllers/login");
const add = require("./src/controllers/add");
const materia = require("./src/controllers/materia");
const cadastro = require("./src/controllers/cadastro");
const avaliacao = require("./src/controllers/avaliacao");

// Iniciando as rotas
route
  .get("/", login.loginGet)
  .post("/", login.loginPost);

route
  .get("/logout", login.logout);

route
  .get("/home", home.HomeAlunoGet);

route
  .get("/homeprof", home.HomeProfGet);

route
  .get("/addPdf/:IDMateria", add.AddPdfGet)
  .post("/addPdf/:IDMateria", multer(config).single("foto"), add.AddPdfPost);

route
  .get("/materia/:IDMateria", materia.materiaGet);

route
  .get("/materiaProf/:IDMateria", materia.materiaProfGet);

route
  .get("/addAluno", cadastro.alunoGet)
  .post("/addAluno", multer(config).single("foto"), cadastro.alunoInsert);

route
  .get("/addTurma", cadastro.turmaGet)
  .post("/addTurma", cadastro.turmaInsert);

route
  .get("/addProf", cadastro.professorGet)
  .post("/addProf", multer(config).single("foto"), cadastro.professorInsert);

route
  .get("/addMateria", add.addMateriaGet)
  .post("/addMateria", add.addMateriaPost);

route
  .get("/AvaliacaoEstudantes/:IDMateria/:IDAluno", avaliacao.avaliacaoGet)
  .post("/AvaliacaoEstudantes/:IDMateria/:IDAluno", avaliacao.avaliacaoPost);
module.exports = route;
