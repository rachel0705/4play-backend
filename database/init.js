const db = require("./db");
const bcrypt = require("bcrypt");

db.serialize(() => {
  // TABLA USERS
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user'
    )
  `);

  // TABLA COURTS (las 4 canchas)
  db.run(`
    CREATE TABLE IF NOT EXISTS courts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'active'
    )
  `);

  // TABLA RESERVATIONS
  db.run(`
    CREATE TABLE IF NOT EXISTS reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      court_id INTEGER NOT NULL,
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'active',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (court_id) REFERENCES courts(id)
    )
  `);

  // INSERTAR 4 CANCHAS SI NO EXISTEN
  db.get(`SELECT COUNT(*) AS total FROM courts`, (err, row) => {
    if (err) {
      console.error("❌ Error contando canchas:", err.message);
      return;
    }

    if (row.total === 0) {
      const stmt = db.prepare(`INSERT INTO courts (name, status) VALUES (?, ?)`);
      for (let i = 1; i <= 4; i++) {
        stmt.run(`Cancha ${i}`, "active");
      }
      stmt.finalize();
      console.log("✅ Seed listo: 4 canchas creadas");
    } else {
      console.log(`ℹ️ Ya existen ${row.total} canchas, no se insertó seed`);
    }
  });
});

// SEED ADMIN (si no existe)
const adminEmail = "admin@4play.com";
const adminPassword = "Admin123!"; // puedes cambiarlo, pero guárdalo para dárselo al profe

db.get(`SELECT id FROM users WHERE email = ?`, [adminEmail], (err, row) => {
  if (err) {
    console.error("❌ Error buscando admin:", err.message);
    return;
  }

  if (!row) {
    const hashed = bcrypt.hashSync(adminPassword, 10);

    db.run(
      `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
      ["Profesor Admin", adminEmail, hashed, "admin"],
      (err2) => {
        if (err2) {
          console.error("❌ Error insertando admin:", err2.message);
        } else {
          console.log("✅ Admin creado: admin@4play.com / Admin123!");
        }
      }
    );
  } else {
    console.log("ℹ️ Admin ya existe (no se re-creó)");
  }
});
