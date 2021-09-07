const Sequelize = require("sequelize");
const db = require("./database");

module.exports = db.define("students", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "null",
  },
  gpa: {
    type: Sequelize.FLOAT,
    validate: {
      min: 1.0,
      max: 4.0,
    },
  },
});
