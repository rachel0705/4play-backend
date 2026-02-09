const express = require("express");
const cors = require("cors");
const courtsRoutes = require("./routes/courts.routes");
const authRoutes = require("./routes/auth.routes");
require("dotenv").config();

require("./database/db");     // conecta
require("./database/init");   // crea tablas + seed

const app = express();

app.use(cors());
app.use(express.json());
app.use("/courts", courtsRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API de reservas de canchas funcionando 🚀" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});