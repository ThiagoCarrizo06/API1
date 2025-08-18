const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Conexión a MySQL (cambiá los datos según tu XAMPP)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",        // usuario por defecto en XAMPP
  password: "",        // normalmente vacío en XAMPP
  database: "testdb"   // ⚠️ cambiá por el nombre real de tu base
});

db.connect(err => {
  if (err) {
    console.error("❌ Error conectando a MySQL:", err);
    return;
  }
  console.log("✅ Conectado a MySQL");
});

// 🔹 Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor backend funcionando 🚀");
});

// 🔹 Ejemplo para traer datos de una tabla "users"
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("❌ Error en la consulta:", err);
      res.status(500).json({ error: "Error en la consulta" });
      return;
    }
    res.json(results);
  });
});

// 🔹 Arrancar servidor
app.listen(5000, () => {
  console.log("🚀 Servidor backend en http://localhost:5000");
});