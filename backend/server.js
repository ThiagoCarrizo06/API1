import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();
const app = express();

// CORS
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

// Conexión a MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "userdb",
  waitForConnections: true,
  connectionLimit: 10
});

// Ruta de prueba
app.get("/", (_req, res) => {
  res.send("API de usuarios corriendo ✅");
});

// Listar usuarios
app.get("/usuarios", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM usr ORDER BY id DESC");
    res.json(rows);
  } catch (e) {
    res.status(500).json({ message: "Error en servidor", error: e.message });
  }
});

// Obtener usuario por ID
app.get("/usuarios/:id", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM usr WHERE id = ?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "No encontrado" });
    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ message: "Error en servidor", error: e.message });
  }
});

// Crear usuario
app.post("/usuarios", async (req, res) => {
  try {
    const { nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email } = req.body;
    if (!nombre || !apellido || !email) return res.status(400).json({ message: "Campos obligatorios faltantes" });

    const sql = `INSERT INTO usr (nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.execute(sql, [nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email]);
    res.status(201).json({ message: "Usuario creado", id: result.insertId });
  } catch (e) {
    if (e.code === "ER_DUP_ENTRY") return res.status(409).json({ message: "El email ya existe" });
    res.status(500).json({ message: "Error en servidor", error: e.message });
  }
});

// Actualizar usuario
app.put("/usuarios/:id", async (req, res) => {
  try {
    const { nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email } = req.body;
    const sql = `UPDATE usr SET nombre=?, apellido=?, direccion=?, telefono=?, celular=?, fecha_nacimiento=?, email=? WHERE id=?`;
    const [result] = await pool.execute(sql, [nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email, req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: "No encontrado" });
    res.json({ message: "Usuario actualizado" });
  } catch (e) {
    if (e.code === "ER_DUP_ENTRY") return res.status(409).json({ message: "El email ya existe" });
    res.status(500).json({ message: "Error en servidor", error: e.message });
  }
});

// Eliminar usuario
app.delete("/usuarios/:id", async (req, res) => {
  try {
    const [result] = await pool.execute("DELETE FROM usr WHERE id=?", [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: "No encontrado" });
    res.json({ message: "Usuario eliminado" });
  } catch (e) {
    res.status(500).json({ message: "Error en servidor", error: e.message });
  }
});

// Levantar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
