const sequelize = require("sequelize");
//configurações da base de dados
const database = new sequelize("PortalAlunos", "disrct", "etstech31415", {
    // dialect: "mssql",
    // host: "localhost",
    // port: 57136, //benhur

    dialect: "mssql",
    host: "localhost",
    port: 63650, //emy
});
database.sync();
module.exports = database;
