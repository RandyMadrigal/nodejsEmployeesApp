const dateHelper = require("../util/helpers/date");
const nominaHlp = require("../util/helpers/nomina");
const validateHlp = require("../util/helpers/validate");
const Employees = require("../model/employees");

exports.getIndex = (req, res, next) => {
  Employees.findAll()
    .then((result) => {
      const item = result.map((result) => result.dataValues); //Estandar
      res.render("index", {
        titlePage: "Home",
        date: dateHelper.getDate,
        item: item,
        hasItems: item.length > 0,
      });
    })
    .catch((err) => console.log(err));
};

exports.getAddEmployee = (req, res, next) => {
  res.render("admin/add-employee", {
    pageTitle: "add-Employee",
    date: dateHelper.getDate,
    editMode: false,
  });
};

exports.postEmployee = (req, res, next) => {
  const Nombre = req.body.Nombre;
  const Apellido = req.body.Apellido;
  const Cedula = req.body.Cedula;
  const Email = req.body.Email;
  const Edad = req.body.Edad;
  const Telefono = req.body.Telefono;
  const Genero = req.body.Genero;
  const Nacionalidad = req.body.Nacionalidad;
  const Direccion = req.body.Direccion;
  const Departamento = req.body.Departamento;
  const Cargo = req.body.Cargo;
  const Sueldo = req.body.Sueldo;

  Employees.create({
    Nombre: Nombre,
    Apellido: Apellido,
    Cedula: Cedula,
    Email: Email,
    Edad: Edad,
    Telefono: Telefono,
    Genero: Genero,
    Nacionalidad: Nacionalidad,
    Direccion: Direccion,
    Departamento: Departamento,
    Cargo: Cargo,
    Sueldo: Sueldo,
  })
    .then((result) => {
      console.log("Created Employee");
      res.redirect("/index");
    })
    .catch((err) => console.log(err));
};

exports.getDetails = (req, res, next) => {
  const Id = req.params.Id;
  if (Id === null || Id === undefined) {
    console.log("not found");
  }

  Employees.findByPk(Id)
    .then((result) => {
      const item = result.dataValues;
      res.render("admin/details", {
        date: dateHelper.getDate,
        item: item,
        titlePage: "Home",
      });
    })
    .catch((err) => console.log(err));
};

exports.getAdminOptions = (req, res, next) => {
  res.render("admin/admin-options", {
    titlePage: "Administrar",
    date: dateHelper.getDate,
  });
};

exports.getEditEmployee = (req, res, next) => {
  Employees.findAll()
    .then((result) => {
      const item = result.map((result) => result.dataValues); //Estandar
      res.render("admin/admin-employee", {
        titlePage: "Admin-edit",
        date: dateHelper.getDate,
        item: item,
        hasItems: item.length > 0,
        deleteEmployee: true,
      });
    })
    .catch((err) => console.log(err));
};

exports.getEdit = (req, res, next) => {
  const editMode = req.query.edit;
  const Id = req.params.Id;

  Employees.findByPk(Id)
    .then((result) => {
      const item = result.dataValues;

      res.render("admin/add-employee", {
        pageTitle: "Edit-Employee",
        date: dateHelper.getDate,
        editMode: editMode,
        item: item,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEdit = (req, res, next) => {
  const Id = req.body.Id;
  const Nombre = req.body.Nombre;
  const Apellido = req.body.Apellido;
  const Cedula = req.body.Cedula;
  const Email = req.body.Email;
  const Edad = req.body.Edad;
  const Telefono = req.body.Telefono;
  const Genero = req.body.Genero;
  const Nacionalidad = req.body.Nacionalidad;
  const Direccion = req.body.Direccion;
  const Departamento = req.body.Departamento;
  const Cargo = req.body.Cargo;
  const Sueldo = req.body.Sueldo;

  console.log(Apellido);

  Employees.findByPk(Id)
    .then((item) => {
      item.Nombre = Nombre;
      item.Apellido = Apellido;
      item.Cedula = Cedula;
      item.Email = Email;
      item.Edad = Edad;
      item.Telefono = Telefono;
      item.Genero = Genero;
      item.Nacionalidad = Nacionalidad;
      item.Direccion = Direccion;
      item.Departamento = Departamento;
      item.Cargo = Cargo;
      item.Sueldo = Sueldo;
      return item.save();
    })
    .then((result) => {
      console.log("Updated....");
      res.redirect("/admin-employee");
    })
    .catch((err) => console.log(err));
};

exports.getDelete = (req, res, next) => {
  const editMode = req.query.delete;
  const Id = req.params.Id;

  Employees.findByPk(Id)
    .then((result) => {
      const item = result.dataValues;

      res.render("admin/delete-employee", {
        pageTitle: "delete-Employee",
        date: dateHelper.getDate,
        editMode: editMode,
        item: item,
      });
    })
    .catch((err) => console.log(err));
};

exports.postDelete = (req, res, next) => {
  const Id = req.body.Id;

  try {
    Employees.destroy({ where: { Id: Id } });
    console.log("Eliminado con exito");
  } catch (err) {
    console.log(err);
  }

  res.redirect("/admin-employee");
};

exports.getVacationManager = (req, res, next) => {
  Employees.findAll({ order: [["Vacaciones", "ASC"]] })
    .then((result) => {
      const item = result.map((result) => result.dataValues);
      res.render("admin/vacation-manager", {
        titlePage: "Vacation Manager",
        date: dateHelper.getDate,
        item: item,
        hasItems: item.length > 0,
        helpers: {
          validate: validateHlp.validate,
        },
      });
    })
    .catch((err) => console.log(err));
};

exports.postVacationManager = (req, res, next) => {
  const Id = req.body.Id;
  let _vacaciones = req.body.Vacaciones;

  console.log(_vacaciones);

  Employees.update({ Vacaciones: _vacaciones }, { where: { Id: Id } })
    .then((result) => {
      console.log(result);
      res.redirect("/vacation-manager");
    })
    .catch((err) => console.log(err));
};

exports.getNomina = (req, res, next) => {
  Employees.findAll({ order: [["Sueldo", "DESC"]] })
    .then((result) => {
      const item = result.map((result) => result.dataValues); //Estandar

      res.render("admin/admin-nomina", {
        titlePage: "Nomina de empleados",
        date: dateHelper.getDate,
        item: item,
        hasItems: item.length > 0,

        helpers: {
          AFP: nominaHlp.AFP,
          SFS: nominaHlp.SFS,
          ANUAL: nominaHlp.SueldoAnual,
          Descuentos: nominaHlp.TotalDescuento,
          SueltoNeto: nominaHlp.SueldoNeto,
          ISR: nominaHlp.ISR,
        },
      });
    })
    .catch((err) => console.log(err));
};
