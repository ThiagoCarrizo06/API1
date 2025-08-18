import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",      // tu usuario MySQL
  password: "",      // tu contraseña si tenés
  database: "usuarios_db"
});

connection.connect((err) => {
  if (err) {
    console.error("Error conectando a MySQL:", err);
    return;
  }
  console.log("Conectado a MySQL ✅");
});

export default connection;