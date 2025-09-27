const { Sequelize } = require("sequelize");

const db = new Sequelize({
  database: "banco",
  username: "root",
  password: "root",
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

function connect() {
  db.sync()
    .then(() => {
      console.log("concetado no banco");
    })
    .catch((err) => {
      console.log("erro ao conectar no banco");
    });
}

module.exports = {
  db,
  connect,
};
