const Sequelize = require("sequelize");
const path = require("path"); //para poder accesar a la ruta donde sqlite guarda los archicos (se debe crear una carpeta y un archivo)

//MySql
const sequelize = new Sequelize("staffdb", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

//SQLITE
/*
const sequelize = new Sequelize("sqlite::memory", {
  dialect: "sqlite",
  storage: path.join(
    path.dirname(require.main.filename),
    "util/database",
    "staffdb.sqlite"
  ),

}
*/

module.exports = sequelize;
