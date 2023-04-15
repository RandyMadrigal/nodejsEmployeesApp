const dateHelper = require("../util/helpers/date");
const nominaHlp = require("../util/helpers/nomina");
const validateHlp = require("../util/helpers/validate");
const Employees = require("../model/employees");
const Department = require("../model/department");
const Position = require("../model/position");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//filter in the index page.
exports.getIndex = async (req, res, next) => {
  let filterName = req.query.filterName;

  if (filterName === undefined || filterName === null) {
    filterName = "";
  }

  try {
    const department = await Department.findAll();
    const position = await Position.findAll();

    Employees.findAll({
      where: { Nombre: { [Op.like]: `%${filterName}%` } },
      include: [{ model: Department }, { model: Position }],
    })
      .then((result) => {
        const item = result.map((result) => result.dataValues); //Estandar
        res.render("index", {
          titlePage: "Home",
          date: dateHelper.getDate,
          item: item,
          hasItems: item.length > 0,
          activeBtn: department.length > 0 && position.length > 0,
          filter: true,
        });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

exports.getAddEmployee = async (req, res, next) => {
  try {
    let department = await Department.findAll();
    let position = await Position.findAll();

    const _department = department.map((department) => department.dataValues); //Estandar
    const _position = position.map((position) => position.dataValues); //Estandar

    res.render("admin/add-employee", {
      pageTitle: "add-Employee",
      date: dateHelper.getDate,
      editMode: false,
      position: _position,
      hasPosition: _position.length > 0,
      department: _department,
      hasDepartment: _department.length > 0,
    });
  } catch (err) {
    console.log(err);
  }
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
  const departmentId = req.body.DepartmentId;
  const positionId = req.body.CargoId;
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
    departmentId: departmentId,
    positionId: positionId,
    Sueldo: Sueldo,
  })
    .then((result) => {
      console.log("Empleado creado con exito");
      res.redirect("/index");
    })
    .catch((err) => console.log(err));
};

exports.getDetails = (req, res, next) => {
  const Id = req.params.Id;
  if (Id === null || Id === undefined) {
    console.log("not found");
  }

  Employees.findByPk(Id, {
    include: [{ model: Department }, { model: Position }],
  })
    .then((result) => {
      const item = result.dataValues;
      console.log(item);
      res.render("admin/details", {
        date: dateHelper.getDate,
        item: item,
        titlePage: "Home",
        helpers: {
          Sueldo: nominaHlp.Sueldo,
        },
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
  Employees.findAll({
    include: [{ model: Department }, { model: Position }],
  })
    .then((result) => {
      const item = result.map((result) => result.dataValues); //Estandar
      res.render("admin/admin-employee", {
        titlePage: "Admin-edit",
        date: dateHelper.getDate,
        item: item,
        hasItems: item.length > 0,
      });
    })
    .catch((err) => console.log(err));
};

exports.getEdit = async (req, res, next) => {
  try {
    const editMode = req.query.edit;
    const Id = req.params.Id;

    let department = await Department.findAll();
    let position = await Position.findAll();

    const _department = department.map((department) => department.dataValues); //Estandar
    const _position = position.map((position) => position.dataValues); //Estandar

    Employees.findByPk(Id, {
      include: [{ model: Department }, { model: Position }],
    })
      .then((result) => {
        const item = result.dataValues;

        res.render("admin/add-employee", {
          pageTitle: "Edit-Employee",
          date: dateHelper.getDate,
          editMode: editMode,
          item: item,
          position: _position,
          hasPosition: _position.length > 0,
          department: _department,
          hasDepartment: _department.length > 0,
        });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
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
  const departmentId = req.body.DepartmentId;
  const positionId = req.body.CargoId;

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
      item.departmentId = departmentId;
      item.positionId = positionId;
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
  Employees.findAll(
    {
      include: [{ model: Department }, { model: Position }],
    },
    {
      order: [["isVacaciones", "ASC"]],
    }
  )
    .then((result) => {
      const item = result.map((result) => result.dataValues);
      res.render("admin/vacation-manager", {
        titlePage: "Vacation Manager",
        date: dateHelper.getDate, //helper
        item: item,
        hasItems: item.length > 0,
        helpers: {
          validate: validateHlp.validate, //helper
          minDate: dateHelper.getMinDate, //helper
        },
      });
    })
    .catch((err) => console.log(err));
};

exports.postVacationManager = (req, res, next) => {
  const Id = req.body.Id;
  let isVacaciones = req.body.isVacaciones;
  let start = req.body.StartVacaciones;
  let end = req.body.EndVacaciones;

  Employees.update(
    { isVacaciones: isVacaciones, StartVacaciones: start, EndVacaciones: end },
    { where: { Id: Id } }
  )
    .then((result) => {
      console.log(result);
      res.redirect("/vacation-manager");
    })
    .catch((err) => console.log(err));
};

exports.getCancelVacation = (req, res, next) => {
  const editMode = req.query.cancel;
  const Id = req.params.Id;

  Employees.findByPk(Id)
    .then((result) => {
      const item = result.dataValues;

      res.render("admin/cancel-vacation", {
        pageTitle: "Cancel-Vacation",
        date: dateHelper.getDate,
        editMode: editMode,
        item: item,
      });
    })
    .catch((err) => console.log(err));
};

exports.postCancelVacation = (req, res, next) => {
  const Id = req.body.Id;

  Employees.update(
    { isVacaciones: false, StartVacaciones: null, EndVacaciones: null },
    { where: { Id: Id } }
  )
    .then((result) => {
      console.log(result);
      res.redirect("/vacation-manager");
    })
    .catch((err) => console.log(err));
};

exports.getNomina = (req, res, next) => {
  Employees.findAll(
    { include: [{ model: Department }, { model: Position }] },
    { order: [["Sueldo", "DESC"]] }
  )
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

          SueldoNeto: nominaHlp.SueldoNeto,

          ISR: nominaHlp.ISR,
        },
      });
    })
    .catch((err) => console.log(err));
};

exports.postNomina = (req, res, next) => {
  const Id = req.body.Id;
  const Sueldo = req.body.Sueldo;

  Employees.update({ Sueldo: Sueldo }, { where: { Id: Id } })
    .then((result) => {
      console.log(result);
      res.redirect("/admin-nomina");
    })
    .catch((err) => console.log(err));
};
