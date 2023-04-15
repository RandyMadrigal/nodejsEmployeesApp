const express = require("express");
const port = 3800;
const bodyParser = require("body-parser");
const path = require("path");
const expressHbs = require("express-handlebars"); //Engine view
//Database
const sequelize = require("./util/database/database");
const bcryptjs = require("bcryptjs");

//Models
const adminUser = require("./model/adminUser");
const employeesModel = require("./model/employees");
const departmentModel = require("./model/department");
const positionModel = require("./model/position");

const adminRouter = require("./routes/admin");
const departmentRouter = require("./routes/department");
const positionRouter = require("./routes/position");

const loginRouter = require("./routes/login");
const errorController = require("./controllers/error");

const app = express();

app.engine(
  "hbs",
  expressHbs.engine({
    extname: "hbs",
    layoutsDir: "views/layouts",
    defaultLayout: "main-layouts",
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(loginRouter.router);
app.use(adminRouter.router);
app.use(departmentRouter.router);
app.use(positionRouter.router);

app.use("/", errorController.error);

//Relations in the DB
employeesModel.belongsTo(departmentModel, {
  constraint: true,
  OnDelete: "CASCADE",
});
departmentModel.hasMany(employeesModel);

employeesModel.belongsTo(positionModel, {
  constraint: true,
  OnDelete: "CASCADE",
});
positionModel.hasMany(employeesModel);
//Relations in the DB

sequelize
  .sync({ force: true })
  .then((result) => {
    return adminUser.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      const hash = bcryptjs.hashSync(`ADMIN`, 8);
      return adminUser.create({
        UserName: "ADMIN",
        Password: hash,
      });
    }
    return user;
  })
  .then((user) => {
    app.listen(port, () => {
      console.log("running in port " + port + " / Conexion  exitosa");
    });
  })
  .catch((err) => {
    console.log(err);
  });
