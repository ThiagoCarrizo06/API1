import express from "express";
import connection from "../db.js";

const router = express.Router();

// GET todos los usuarios
router.get("/", (req, res) => {
  connection.query("SELECT * FROM usuarios", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// POST nuevo usuario
router.post("/", (req, res) => {
  const { nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email } = req.body;
  connection.query(
    "INSERT INTO usuarios (nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, ...req.body });
    }
  );
});

export default router;