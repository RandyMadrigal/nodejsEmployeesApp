const adminUser = require("../model/adminUser");
const bcryptjs = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("login", { layout: false });
};

exports.postLogin = (req, res, next) => {
  const UserName = req.body.UserName;
  const Password = req.body.Password;

  adminUser
    .findAll({ where: { UserName: UserName } })
    .then((result) => {
      const item = result.map((result) => result.dataValues); //Estandar
      if (item.length == 0) {
        return res.redirect("/");
      }
      bcryptjs
        .compare(Password, item[0].Password)
        .then((isEqual) => {
          if (isEqual) {
            console.log("Welcome");
            return res.redirect("/index");
          }
          return res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
