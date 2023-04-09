const { DATEONLY, Sequelize } = require("sequelize");

const sequelize = require("../util/database/database");

const employees = sequelize.define(
  "employees",
  {
    Id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    Nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    Apellido: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    Cedula: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    Edad: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Email: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    Telefono: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    Genero: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    Nacionalidad: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    Direccion: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    Sueldo: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },

    isVacaciones: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },

    StartVacaciones: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    EndVacaciones: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    createdAt: {
      type: Sequelize.DataTypes.DATEONLY,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: false, // don't add updateAt attribute
  }
);

module.exports = employees;
