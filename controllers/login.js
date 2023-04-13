const adminUser = require("../model/adminUser");

exports.getLogin = (req, res, next) => {
  res.render("login", { layout: false });
};

exports.postLogin = (req, res, next) => {
  const UserName = req.body.UserName;

  adminUser
    .findAll({ where: { UserName: UserName } })
    .then((result) => {
      const item = result.map((result) => result.dataValues); //Estandar
      if (item.length == 0) {
        res.redirect("/");
      } else {
        res.redirect("/index");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
