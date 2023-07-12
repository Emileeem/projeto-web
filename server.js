const express = require('express');
const routes = require('./routes');
const app = express();
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

app.use(express.json());

const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    secret: "disrct31415",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
// Static files
app.use(express.static('public')); // de onde iremos pegar os arquivos.
// EJS
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(routes);
app.listen(3000, () => console.log('Acesse: http://localhost:3000/'));