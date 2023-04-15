const position = require("../model/position");
const Position = require("../model/position");
const dateHelper = require("../util/helpers/date");

exports.getAddPosition = (req, res, next) => {
  Position.findAll()
    .then((result) => {
      const item = result.map((result) => result.dataValues); //Estandar
      res.render("admin/add-position", {
        pageTitle: "add position",
        date: dateHelper.getDate,
        item: item,
        hasItems: item.length > 0,
      });
    })
    .catch((err) => console.log(err));
};

exports.postPosition = (req, res, next) => {
  const Nombre = req.body.Nombre;
  const Id = req.body.Id;

  if (Id == null || Id == undefined) {
    //create
    Position.create({
      Nombre: Nombre,
    })
      .then((result) => {
        console.log("Creado con exito");
        res.redirect("/add-position");
      })
      .catch((err) => console.log(err));
  } else {
    //delete
    try {
      Position.destroy({ where: { Id: Id } });
      console.log("Eliminado con exito");
      res.redirect("/add-position");
    } catch (err) {
      console.log(err);
    }
  }
};
