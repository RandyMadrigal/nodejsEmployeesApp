const { DATEONLY } = require("sequelize");
const Sequelize = require("sequelize");

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

    Departamento: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    Cargo: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    Sueldo: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    Vacaciones: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: Sequelize.DataTypes.DATEONLY,
    },
  },
  {
    timestamps: true,
    createdAt: true, // don't add createdAt attribute
    updatedAt: false,
  }
);

module.exports = employees;
