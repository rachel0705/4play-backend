const db = require("../database/db");

function getAllCourts(callback) {
  const query = "SELECT * FROM courts";

  db.all(query, [], (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
}

module.exports = {
  getAllCourts
};