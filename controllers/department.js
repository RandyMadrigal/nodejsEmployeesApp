const Department = require("../model/department");
const dateHelper = require("../util/helpers/date");

exports.getAddDepartment = (req, res, next) => {
  Department.findAll()
    .then((result) => {
      const item = result.map((result) => result.dataValues); //Estandar
      res.render("admin/add-department", {
        pageTitle: "add department",
        //date: dateHelper.getDate,
        item: item,
        hasItems: item.length > 0,
      });
    })
    .catch((err) => console.log(err));
};

exports.postDepartment = (req, res, next) => {
  const Nombre = req.body.Nombre;
  const Id = req.body.Id;

  if (Id === null || Id === undefined) {
    //create
    Department.create({
      Nombre: Nombre,
    })
      .then((result) => {
        console.log("Created");
        res.redirect("/add-department");
      })
      .catch((err) => console.log(err));
  } else {
    try {
      Department.destroy({ where: { Id: Id } });
      console.log("Eliminado con exito");
      res.redirect("/add-department");
    } catch (err) {
      console.log(err);
    }
  }

  //delete
};
