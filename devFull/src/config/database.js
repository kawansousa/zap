const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("banco", "root", "root", {
  host: "localhost",
  dialect: "postgres",
  logging: false, // ← desabilita os logs SQL
});

module.exports = sequelize;
