import { useEffect, useState } from "react";
import { getUsuarios, deleteUsuario } from "../services/api.js";

export default function UsuarioList({ onEdit }) {
  const [usuarios, setUsuarios] = useState([]);

  const loadUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    }
  };

  useEffect(() => {
    loadUsuarios();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUsuario(id);
      loadUsuarios();
    } catch (error) {
      console.error("Error eliminando usuario:", error);
    }
  };

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>
            {u.nombre} {u.apellido} - {u.email}
            <button onClick={() => onEdit(u)}>Editar</button>
            <button onClick={() => handleDelete(u.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}