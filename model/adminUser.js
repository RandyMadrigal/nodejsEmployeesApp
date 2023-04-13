const Sequelize = require("sequelize");

const sequelize = require("../util/database/database");

const adminUser = sequelize.define("AdminUsers", {
  Id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  UserName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = adminUser;
