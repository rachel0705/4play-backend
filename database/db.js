const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "reservas.db"); // se crea aquí mismo
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Error al abrir la BD:", err.message);
  } else {
    console.log("✅ SQLite conectado:", dbPath);
  }
});

module.exports = db;