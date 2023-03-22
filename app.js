const express = require("express");
const port = 3800;
const bodyParser = require("body-parser");
const path = require("path");
const expressHbs = require("express-handlebars"); //Engine view
//Database
const sequelize = require("./util/database/database");
//Models
const employeesModel = require("./model/employees");

const adminRouter = require("./routes/admin");
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

//DEMO USER

app.use(loginRouter.router);
app.use(adminRouter.router);

app.use("/", errorController.error);

sequelize
  .sync()
  .then((result) => {
    app.listen(port, () => {
      console.log("running in port " + port + " / Conexion de la bd exitosa");
    });
  })
  .catch((err) => {
    console.log(err);
  });
